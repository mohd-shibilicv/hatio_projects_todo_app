import React from "react";
import ProjectCard from "../components/ProjectCard";
import CreateProjectBtn from "../components/CreateProjectBtn";
import LogoutButton from "../components/LogoutBtn";
import { useProjects } from "../hooks/useProjects";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

const Projects: React.FC = () => {
  const { projects, loading, error, handleCreateProject } = useProjects();

  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <main className="home-container">
      <>
        {projects.length > 0 ? (
          <div className="project-list-container">
            <div className="project-list-title ">
              <div className="flex justify-center items-stretch">
                <h3 className="text-28-semibold">All Projects</h3>
                {isAuthenticated && <LogoutButton />}
              </div>
              <CreateProjectBtn onCreate={handleCreateProject} />
            </div>
            <ul className="project-ul">
              {projects.map(project => (
                <ProjectCard key={project.id} {...project} />
              ))}
            </ul>
          </div>
        ) : (
          <div className="project-list-empty">
            <img
              src="/assets/icons/doc.svg"
              alt="Document"
              width={40}
              height={40}
              className="mx-auto"
            />
            <CreateProjectBtn onCreate={handleCreateProject} />
          </div>
        )}
      </>
    </main>
  );
};

export default Projects;