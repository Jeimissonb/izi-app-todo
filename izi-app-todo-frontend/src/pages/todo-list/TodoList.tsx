import { useEffect, useRef, useState } from 'react';
import Button from '../../components/button/Button';
import { api } from '../../services/api';
import Input from '../../components/input/Input';
import styles from './TodoList.module.scss';
import Notification from '../../components/notification/Notification';
import { useAuth } from '../../contexts/AuthContext';
import LogoutButton from '../../components/logout-button/LogoutButton';
import TaskList from './task-list/TaskList';

export interface Task {
  id: number;
  title: string;
  description: string;
  isCompleted: boolean;
}

function TodoList() {
  const { user } = useAuth();

  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState('');
  const [editingTaskId, setEditingTaskId] = useState<number | null>(null);
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' | 'updated' } | null>(null);
  const notificationTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

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
    if (!title.trim()) {
      showNotification('Title cannot be empty', 'error');
      return;
    }
    try {
      const response = await api.post('/tasks', { title });
      setTasks([...tasks, response.data]);
      setTitle('');
      showNotification('Task added successfully', 'success');
    } catch (error) {
      console.error('Failed to add task', error);
    }
  };

  const updateTask = async (taskId: number) => {
    if (!title.trim()) {
      showNotification('Title cannot be empty', 'error');
      return;
    }
    try {
      const response = await api.put(`/tasks/${taskId}`, { title: title.trim() });
      setTasks(tasks.map(task => (task.id === taskId ? response.data : task)));
      setTitle('');
      setEditingTaskId(null);
      showNotification('Task updated successfully', 'updated');
    } catch (error) {
      console.error('Failed to update task', error);
      showNotification('Failed to update task', 'error');
    }
  };

  const deleteTask = async (taskId: number) => {
    try {
      await api.delete(`/tasks/${taskId}`);
      setTasks(tasks.filter(task => task.id !== taskId));
      showNotification('Task deleted successfully', 'success');
    } catch (error) {
      console.error('Failed to delete task', error);
      showNotification('Failed to delete task', 'error');
    }
  };

  const deleteAllCompletedTasks = async (tasks: Task[]) => {
    try {
      tasks.map(async (task) => {
        try {
          if (task.isCompleted) {
            await api.delete(`/tasks/${task.id}`);
            showNotification('All done tasks are cleared!', 'success');

            fetchTasks()
          }
        } catch (error) {
          console.error('Failed to delete task', error);
          showNotification('Failed to delete task: ' + task.title, 'error');
        }
      })
    } catch (error) {
      console.error('Failed to delete task', error);
      showNotification('Failed to delete task', 'error');
    }
  };

  const toggleCompleteTask = async (taskId: number) => {
    setNotification(null);
    try {
      const task = tasks.find(task => task.id === taskId);
      if (task) {
        const response = await api.put(`/tasks/${taskId}`, { isCompleted: !task.isCompleted });
        setTasks(prevTasks =>
          prevTasks.map(t =>
            t.id === taskId ? { ...t, ...response.data } : t
          )
        );
        if (response.data.isCompleted) {
          showNotification('Task done!!!', 'updated');
        } else {
          showNotification('Task removed from done!', 'updated');
        }
      }
    } catch (error) {
      console.error('Failed to update task', error);
    }
  };

  const startEditingTask = (task: Task) => {
    setTitle(task.title || '');
    setEditingTaskId(task.id);
  };

  const cancelEditing = () => {
    setTitle('');
    setEditingTaskId(null);
  };

  const showNotification = (message: string, type: 'success' | 'error' | 'updated') => {
    if (notificationTimeoutRef.current) {
      clearTimeout(notificationTimeoutRef.current);
      setNotification(null);
    }

    setNotification({ message, type });
    notificationTimeoutRef.current = setTimeout(() => {
      setNotification(null);
      notificationTimeoutRef.current = null;
    }, 3000);
  };

  return (
    <>
      <LogoutButton user={user as string} />
      <div className={styles.container}>
        <h1>TO-DO</h1>
        <div className={styles.inputContainer}>
          <Input
            type="text"
            value={title || ''}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="What do you need to do?"
          />
          {editingTaskId ? (
            <>
              <Button label="Update" primary onClick={() => updateTask(editingTaskId)} />
              <Button label="Cancel" onClick={cancelEditing} />
            </>
          ) : (
            <Button label="Add" primary onClick={addTask} />
          )}
        </div>
        <TaskList taskList={tasks} toggleCompleteTask={toggleCompleteTask} startEditingTask={startEditingTask} deleteTask={deleteTask} />
        {
          tasks.some(task => task.isCompleted) &&
          <button
            className={styles.clearButton}
            onClick={() => deleteAllCompletedTasks(tasks)}
          >
            Clear All Completed Tasks
          </button>
        }

        {notification &&
          <Notification
            message={notification.message}
            type={notification.type}
            onClose={() => setNotification(null)}
          />
        }
      </div>
    </>

  );
}
export default TodoList