import React from "react";
import { useParams } from "react-router-dom";

const ProjectDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <></>
  );
};

export default ProjectDetails;
