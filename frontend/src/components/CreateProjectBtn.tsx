import React, { useState } from "react";
import { useCreateProjectMutation } from "../services/api";

const CreateProjectBtn = () => {
  const [newProjectTitle, setNewProjectTitle] = useState("");
  const [createProject] = useCreateProjectMutation();

  const handleCreateProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newProjectTitle.trim()) {
      await createProject({ title: newProjectTitle });
      setNewProjectTitle("");
    }
  };
  return (
    <form onSubmit={handleCreateProject}>
      <button type="submit" onClick={handleCreateProject} className="gradient-blue flex gap-1 shadow-md p-3 rounded-lg">
        <img src="/assets/icons/add.svg" alt="add" width={24} height={24} />
        <p className="hidden sm:block">Start a new project</p>
      </button>
    </form>
  );
};

export default CreateProjectBtn;
