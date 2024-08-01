import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useCreateTodoMutation, useGetTodosQuery } from '../services/api';
import Loader from '../components/Loader';

const ProjectDetails = () => {
    const { id } = useParams<{ id: string }>();
    const { data: todos, isLoading, isError } =useGetTodosQuery(id);
    const [createTodo] = useCreateTodoMutation();
    const [newTodoDescription, setNewTodoDescription] = useState('');

    const handleCreateTodo = async (e: React.FormEvent) => {
        e.preventDefault();
        if (newTodoDescription.trim()) {
            await createTodo({ project: id, description: newTodoDescription });
            setNewTodoDescription('');
        }
    };

    if (isLoading) return <Loader />
    if (isError) return <div>Error loading todos. Try again!</div>

  return (
    <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Project Todos</h1>
    </div>
  )
}

export default ProjectDetails