import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import {
  useCreateTodoMutation,
  useGetTodosQuery,
  useUpdateProjectMutation,
  useGetProjectQuery,
} from "../services/api";
import Loader from "../components/Loader";

export interface TodoProps {
  id: number;
  description: string;
  status: boolean;
}

const ProjectDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const {
    data: project,
    isLoading: isProjectLoading,
    isError: isProjectError,
  } = useGetProjectQuery(id);
  const {
    data: initialTodos,
    isLoading: isTodosLoading,
    isError: isTodosError,
  } = useGetTodosQuery(id);

  const [createTodo] = useCreateTodoMutation();
  const [updateProject] = useUpdateProjectMutation();
  const [todos, setTodos] = useState<TodoProps[]>(initialTodos?.results || []);
  const [newTodoDescription, setNewTodoDescription] = useState("");
  const [projectTitle, setProjectTitle] = useState("");

  useEffect(() => {
    if (project) {
      setProjectTitle(project.title);
    }
  }, [project]);

  useEffect(() => {
    if (initialTodos) {
      setTodos(initialTodos.results);
    }
  }, [initialTodos]);

  const handleCreateTodo = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newTodoDescription.trim()) {
      try {
        const newTodo = await createTodo({
          project: id,
          description: newTodoDescription,
        }).unwrap();
        setTodos([newTodo, ...todos]);
        setNewTodoDescription("");
      } catch (error) {
        console.error("Failed to create todo:", error);
      }
    }
  };

  const handleTitleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value;
    setProjectTitle(newTitle);
    await updateProject({ id, title: newTitle });
  };

  if (isProjectLoading || isTodosLoading) return <Loader />;
  if (isProjectError) return <div>Error loading project. Try again!</div>;
  if (isTodosError) return <div>Error loading todos. Try again!</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <Link to="/">Back</Link>
      <h1 className="text-3xl font-bold mb-6">
        <input
          type="text"
          value={projectTitle}
          onChange={handleTitleChange}
          className="w-full p-2 border border-gray-300 text-black rounded-md"
        />
      </h1>
      <ul>
        {todos.map(({ id, description, status }: TodoProps) => (
          <li key={id}>
            {description} - {status ? "Completed" : "Pending"}
          </li>
        ))}
      </ul>
      <form onSubmit={handleCreateTodo}>
        <input
          type="text"
          value={newTodoDescription}
          onChange={(e) => setNewTodoDescription(e.target.value)}
          className="w-full p-2 border border-gray-300 text-black rounded-md"
          placeholder="New Todo"
        />
        <button
          type="submit"
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md"
        >
          Add Todo
        </button>
      </form>
    </div>
  );
};

export default ProjectDetails;
