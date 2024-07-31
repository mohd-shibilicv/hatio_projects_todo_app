from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from projects.models import Project
from gist.services import create_gist


@api_view(['POST'])
def export_project_gist(request, pk):
    try:
        project = Project.objects.get(pk=pk)
        gist_url = create_gist(project)
        return Response({"gist_url": gist_url}, status=status.HTTP_200_OK)
    except Project.DoesNotExist:
        return Response({"error": "Project not found"}, status=status.HTTP_404_NOT_FOUND)
