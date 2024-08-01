from rest_framework import viewsets, permissions, serializers
from django_filters.rest_framework import DjangoFilterBackend
from todos.models import Todo
from projects.models import Project
from todos.serializers import TodoSerializer


class TodoViewSet(viewsets.ModelViewSet):
    serializer_class = TodoSerializer
    permission_classes = [permissions.IsAuthenticated]
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['status', 'project']

    def get_queryset(self):
        return Todo.objects.filter(project__owner=self.request.user)
    
    def perform_create(self, serializer):
        project_id = self.request.data.get('project')
        if project_id:
            project = Project.objects.get(id=project_id, owner=self.request.user)
            serializer.save(project=project)
        else:
            raise serializers.ValidationError('Project ID is required')
