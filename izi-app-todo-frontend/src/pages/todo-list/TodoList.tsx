import { useEffect, useState } from 'react';
import { Button } from '../../components/button/Button';
import { api } from '../../services/api';
import { Input } from '../../components/input/Input';
import styles from './TodoList.module.scss';
import { useAuth } from '../../contexts/AuthContext';

interface Task {
  id: number;
  title: string;
  description: string;
  isCompleted: boolean;
}

export function TodoList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const { logout } = useAuth();

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await api.get('/tasks');
      setTasks(response.data);
    } catch (error) {
      console.error('Failed to fetch tasks', error);
    }
  };

  const addTask = async () => {
    try {
      const response = await api.post('/tasks', { title, description });
      setTasks([...tasks, response.data]);
      setTitle('');
      setDescription('');
    } catch (error) {
      console.error('Failed to add task', error);
    }
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <div className={styles.todoContainer}>
      <h2>Todo List</h2>
      <Input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
      />
      <Input
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
      />
      <Button label="Add Task" primary onClick={addTask} />
      <Button label="Logout" onClick={handleLogout} />
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <h3>{task.title}</h3>
            <p>{task.description}</p>
            <p>{task.isCompleted ? 'Completed' : 'Incomplete'}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}