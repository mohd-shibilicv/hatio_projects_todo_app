import React from "react";
import { useGetProjectsQuery } from "../services/api";
import Loader from "../components/Loader";
import ProjectCard from "../components/ProjectCard";
import CreateProjectBtn from "../components/CreateProjectBtn";
import LogoutButton from "../components/LogoutBtn";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

const Projects: React.FC = () => {
  const { data: projects, isLoading, isError } = useGetProjectsQuery({});
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );

  if (isLoading) return <Loader />;
  if (isError) return <div>Error Loading Projects. Try again!</div>;

  return (
    <main className="home-container">
      <>
        {projects.results.length > 0 ? (
          <div className="project-list-container">
            <div className="project-list-title ">
              <h3 className="text-28-semibold">All Projects</h3>
              <CreateProjectBtn />
            </div>
            <ul className="project-ul">
              {projects?.results?.map(
                ({ id, title, todos, createdAt }: any) => (
                  <ProjectCard
                    key={id}
                    id={id}
                    title={title}
                    todoCount={todos.length}
                    createdAt={createdAt}
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
            <CreateProjectBtn />
          </div>
        )}
      </>
      {isAuthenticated && <LogoutButton />}
    </main>
  );
};

export default Projects;
