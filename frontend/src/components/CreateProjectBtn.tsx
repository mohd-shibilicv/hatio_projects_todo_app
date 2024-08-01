import React from "react";
import { useCreateProjectMutation } from "../services/api";
import { useNavigate } from "react-router-dom";

interface CreateProjectBtnProps {
  onCreate: (newProject: any) => void;
}

const CreateProjectBtn: React.FC<CreateProjectBtnProps> = ({ onCreate }) => {
  const [createProject, { isLoading }] = useCreateProjectMutation();
  const navigate = useNavigate();

  const handleCreateProject = async () => {
    try {
      const newProject = await createProject({ title: "Untitled" }).unwrap();
      onCreate(newProject);
      navigate(`/project/${newProject.id}`);
    } catch (error) {
      console.error("Failed to create project:", error);
    }
  };

  return (
    <button
      onClick={handleCreateProject}
      className="gradient-blue flex gap-1 shadow-md p-3 rounded-lg"
    >
      <img src="/assets/icons/add.svg" alt="add" width={24} height={24} />
      <p className="hidden sm:block">{isLoading ? 'Creating...' : 'Create New Project'}</p>
    </button>
  );
};

export default CreateProjectBtn;
