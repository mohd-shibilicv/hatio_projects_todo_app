import axios, { AxiosInstance } from 'axios';

const axiosInstance: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_APP_API_URL,
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});

// Project-related API calls
export const getProjects = () => axiosInstance.get('projects/');
export const getProject = (id: string) => axiosInstance.get(`projects/${id}/`);
export const createProject = (newProject: any) => axiosInstance.post('projects/', newProject);
export const updateProject = (id: string, patch: any) => axiosInstance.patch(`projects/${id}/`, patch);

// Todo-related API calls
export const getTodos = (projectId: string) => axiosInstance.get(`todos/?project=${projectId}`);
export const createTodo = (newTodo: any) => axiosInstance.post('todos/', newTodo);
export const updateTodo = (id: string, patch: any) => axiosInstance.patch(`todos/${id}/`, patch);
export const deleteTodo = (id: string) => axiosInstance.delete(`todos/${id}`);
