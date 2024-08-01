import React, { useEffect, useState } from "react";
import { useGetProjectsQuery } from "../services/api";
import Loader from "../components/Loader";
import ProjectCard from "../components/ProjectCard";
import CreateProjectBtn from "../components/CreateProjectBtn";
import LogoutButton from "../components/LogoutBtn";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { TodoProps } from "./ProjectDetails";

interface ProjectProps {
  id: string;
  title: string;
  todos: TodoProps[];
  created_date: string;
}

const Projects: React.FC = () => {
  const { data, isLoading, isError } = useGetProjectsQuery({});
  const [projects, setProjects] = useState(data?.results || []);
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );

  useEffect(() => {
    if (data) {
      setProjects(data.results);
    }
  }, [data]);

  const handleNewProject = (newProject: any) => {
    setProjects([newProject, ...projects]);
  };

  if (isLoading) return <Loader />;
  if (isError) return <div>Error Loading Projects. Try again!</div>;

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
              <CreateProjectBtn onCreate={handleNewProject} />
            </div>
            <ul className="project-ul">
              {projects?.map(
                ({ id, title, todos, created_date }: ProjectProps) => (
                  <ProjectCard
                    key={id}
                    id={id}
                    title={title}
                    todoCount={todos.length}
                    createdAt={created_date}
                  />
                )
              )}
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
            <CreateProjectBtn onCreate={handleNewProject} />
          </div>
        )}
      </>
    </main>
  );
};

export default Projects;
