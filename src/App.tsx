import React, { useEffect, useState } from 'react';
import axios from 'axios';

type Task = {
  id: number;
  title: string;
  completed: boolean;
};

const API_URL = 'http://localhost:8080/tasks';

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState('');

  const fetchTasks = async () => {
    const response = await axios.get<Task[]>(API_URL);
    setTasks(response.data);
  };

  const addTask = async () => {
    if (!title.trim()) return;
    await axios.post(API_URL, { title });
    setTitle('');
    fetchTasks();
  };

  const markDone = async (id: number) => {
    await axios.put(`${API_URL}/${id}`, { completed: true });
    fetchTasks();
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h2>Task Manager</h2>
      <input value={title} onChange={e => setTitle(e.target.value)} placeholder="New task..." />
      <button onClick={addTask}>Add</button>
      <ul>
        {tasks.map(task => (
          <li key={task.id}>
            <span style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
              {task.title}
            </span>
            {!task.completed && <button onClick={() => markDone(task.id)}>Mark Done</button>}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
