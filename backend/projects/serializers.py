from rest_framework import serializers
from todos.serializers import TodoSerializer
from projects.models import Project


class ProjectSerializer(serializers.ModelSerializer):
    todos = TodoSerializer(many=True, read_only=True)
    owner = serializers.ReadOnlyField(source='owner.username')

    class Meta:
        model = Project
        fields = ['id', 'title', 'created_date', 'owner', 'todos']


class ProjectSummarySerializer(serializers.ModelSerializer):
    total_todos = serializers.IntegerField()
    completed_todos = serializers.IntegerField()

    class Meta:
        model = Project
        fields = ['id', 'title', 'total_todos', 'completed_todos']
