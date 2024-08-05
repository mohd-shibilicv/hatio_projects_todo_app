// AddTodo.tsx
import { useState } from 'react';
import { useDispatch } from 'react-redux';

const AddTodo = ({ projectId }: { projectId: number}) => {
  const [title, setTitle] = useState('');
  const dispatch = useDispatch();

  return (
    <div>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="New Todo"
      />
      <button>Add Todo</button>
    </div>
  );
};

export default AddTodo;
