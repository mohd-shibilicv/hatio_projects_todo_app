import React from "react";
import { useDeleteTodoMutation, useUpdateTodoMutation } from "../services/api";

interface TodoItemProps {
  id: number;
  description: string;
  status: boolean;
}

const TodoItem: React.FC<TodoItemProps> = ({ id, description, status }) => {
  const [updateTodo] = useUpdateTodoMutation();
  const [deleteTodo] = useDeleteTodoMutation();

  const handleToggle = () => {
    updateTodo({ id, status: !status });
  };

  const handleDelete = () => {
    deleteTodo(id);
  };

  return (
    <div className="flex items-center justify-between p-4 bg-white rounded-lg shadow">
      <div className="flex items-center">
        <input
          type="checkbox"
          checked={status}
          onChange={handleToggle}
          className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
        />
        <span className={`ml-3 ${status ? 'line-through text-gray-500': 'text-gray-900'}`}>
            {description}
        </span>
      </div>
      <button onClick={handleDelete} className="text-red-600 hover:text-red-800">
        Delete
      </button>
    </div>
  );
};

export default TodoItem;
