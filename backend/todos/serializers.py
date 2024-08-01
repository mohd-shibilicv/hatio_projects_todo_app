from rest_framework import serializers
from todos.models import Todo


class TodoSerializer(serializers.ModelSerializer):
    project = serializers.ReadOnlyField(source='project.title')

    class Meta:
        model = Todo
        fields = ['id', 'description', 'status', 'created_date', 'updated_date', 'project']
