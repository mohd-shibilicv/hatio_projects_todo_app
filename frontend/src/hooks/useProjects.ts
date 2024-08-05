import { useState, useEffect } from 'react';
import { getProjects, createProject } from '../services/axios';

export const useProjects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProjects = () => {
    setLoading(true);
    getProjects()
      .then(response => {
        setProjects(response.data);
        setLoading(false);
      })
      .catch(err => {
        setError(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleCreateProject = async (newProjectData) => {
    try {
      const response = await createProject(newProjectData);
      setProjects([...projects, response.data]);
      return response.data;
    } catch (err) {
      setError(err);
      throw err;
    }
  };

  return { projects, loading, error, fetchProjects, handleCreateProject };
};