from django.db import models
from projects.models import Project


class Todo(models.Model):
    description = models.TextField()
    status = models.BooleanField(default=False)
    created_date = models.DateTimeField(auto_now_add=True)
    updated_date = models.DateTimeField(auto_now=True)
    project = models.ForeignKey(Project, related_name='todos', on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.project} - {self.description}"
