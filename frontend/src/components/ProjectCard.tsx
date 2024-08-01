import React from "react";
import { Link } from "react-router-dom";
import { dateConverter } from "../utils/dateConverter";

interface ProjectCardProps {
  id: string;
  title: string;
  todoCount: number;
  createdAt: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  id,
  title,
  todoCount,
  createdAt,
}) => {
  return (
    <Link
      to={`/project/${id}`}
      className="w-full flex items-center justify-between gap-4 rounded-lg bg-doc p-5 shadow-xl"
    >
      <div className="hidden sm:flex items-center gap-3 rounded-md bg-dark-500 p-2">
        <img src="/assets/icons/doc.svg" alt="file" width={40} height={40} />
        <p className="line-clamp-1 text-lg">{title}</p>
      </div>
      <div className="space-y-1 flex flex-col items-center justify-end">
        <p className="line-clamp-1 text-md text-gray-300">Todos: {todoCount}</p>
        <p className="text-sm font-light text-blue-100">
          Created about {dateConverter(createdAt)}
        </p>
      </div>
    </Link>
  );
};

export default ProjectCard;
