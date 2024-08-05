import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

interface CreateProjectBtnProps {
  onCreate: (newProject: any) => Promise<any>;
}

const CreateProjectBtn: React.FC<CreateProjectBtnProps> = ({ onCreate }) => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleCreateProject = async () => {
    setIsLoading(true);
    try {
      const newProject = await onCreate({ title: "Untitled" });
      navigate(`/project/${newProject.id}`);
    } catch (error) {
      console.error("Failed to create project:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleCreateProject}
      className="gradient-blue flex gap-1 shadow-md p-3 rounded-lg"
      disabled={isLoading}
    >
      <img src="/assets/icons/add.svg" alt="add" width={24} height={24} />
      <p className="hidden sm:block">{isLoading ? 'Creating...' : 'Create New Project'}</p>
    </button>
  );
};

export default CreateProjectBtn;