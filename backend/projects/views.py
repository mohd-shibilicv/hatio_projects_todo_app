from rest_framework import viewsets, permissions, status
from rest_framework.response import Response
from rest_framework.decorators import api_view, action
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.exceptions import TokenError
from django.db.models import Count, Q
from django.contrib.auth import get_user_model
from django_filters.rest_framework import DjangoFilterBackend
from projects.utils import create_gist
from projects.models import Project
from projects.serializers import ProjectSerializer, ProjectSummarySerializer, UserSerializer


User = get_user_model()


class ProjectViewSet(viewsets.ModelViewSet):
    serializer_class = ProjectSerializer
    permission_classes = [permissions.IsAuthenticated]
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['title', 'owner']

    def get_queryset(self):
        return Project.objects.filter(owner=self.request.user)
    
    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)
    
    @action(detail=False, methods=['get'])
    def summary(self, request):
        projects = self.get_queryset().annotate(
            total_todos=Count('todos'),
            completed_todos=Count('todos', filter=Q(todos__status=True))
        )
        serializer = ProjectSummarySerializer(projects, many=True)
        return Response(serializer.data)


@api_view(['POST'])
def export_project_gist(request, pk):
    try:
        project = Project.objects.get(pk=pk)
        gist_url = create_gist(project)
        return Response({"gist_url": gist_url}, status=status.HTTP_201_CREATED)
    except Project.DoesNotExist:
        return Response({"error": "Project not found"}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class UserRegisterViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.AllowAny]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)


class LogoutView(viewsets.ViewSet):
    permission_classes = [permissions.IsAuthenticated]

    @action(detail=False, methods=['post'])
    def logout(self, request):
        try:
            refresh_token = request.data['refresh_token']
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response(status=status.HTTP_205_RESET_CONTENT)
        except TokenError:
            return Response(status=status.HTTP_400_BAD_REQUEST)
