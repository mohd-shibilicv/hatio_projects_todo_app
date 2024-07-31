import factory
from django.contrib.auth.models import User
from projects.models import Project
from todos.models import Todo


class UserFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = User

    username = factory.Faker('user_name')
    email = factory.Faker('email')
    password = factory.Faker('password')


class ProjectFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = Project
    
    title = factory.Faker('sentence')
    owner = factory.SubFactory(UserFactory)


class TodoFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = Todo
    
    description = factory.Faker('sentence')
    project = factory.SubFactory(ProjectFactory)
