from github import Github
from django.conf import settings
from projects.models import Project


def create_gist(project: Project) -> str:
    g = Github(settings.GITHUB_ACCESS_TOKEN)
    file_content = f"# {project.title}\n\n"
    completed = project.todos.filter(status=True).count()
    total = project.todos.count()
    file_content += f"Summary: {completed} / {total} completed\n\n"

    file_content += f"## Pending Todos\n"
    for todo in project.todos.filter(staus=False):
        file_content += f"- [ ] {todo.description}\n"
    
    gist = g.get_user().create_gist(
        public=False,
        files={f"{project.title}.md": {"content": file_content}},
        description=f"Gist for project {project.title}"
    )
    return gist.html_url
