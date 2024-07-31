import pytest
from rest_framework.test import APIClient
from tests.factories import UserFactory
from projects.models import Project


@pytest.fixture
def api_client():
    return APIClient()


@pytest.fixture
def user():
    return UserFactory()


@pytest.mark.django_db
def test_create_project(api_client, user):
    api_client.force_authenticate(user=user)
    response = api_client.post('http://127.0.0.1:8000/api/projects/', {'title': 'Test Project'})
    assert response.status_code == 201
    assert Project.objects.count() == 1
    project = Project.objects.first()
    assert project.owner == user
