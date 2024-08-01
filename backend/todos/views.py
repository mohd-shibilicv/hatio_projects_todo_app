from rest_framework import viewsets, permissions
from django_filters.rest_framework import DjangoFilterBackend
from todos.models import Todo
from todos.serializers import TodoSerializer


class TodoViewSet(viewsets.ModelViewSet):
    serializer_class = TodoSerializer
    permission_classes = [permissions.IsAuthenticated]
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['status', 'project']

    def get_queryset(self):
        return Todo.objects.filter(project__owner=self.request.user)
