from rest_framework import serializers
from django.contrib.auth import get_user_model
from todos.serializers import TodoSerializer
from projects.models import Project


User = get_user_model()


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


class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['username', 'email', 'password']
    
    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user
