import React, { useState } from "react";
import styles from './TaskList.module.scss';
import Input from "../../../components/input/Input";
import { Task } from "../TodoList";

interface TaskListProps {
  taskList: Task[];
  toggleCompleteTask: (taskId: number) => void;
  startEditingTask: (task: Task) => void;
  deleteTask: (taskId: number) => void;
}

function TaskList({ taskList, toggleCompleteTask, startEditingTask, deleteTask }: TaskListProps) {
  const [filter, setFilter] = useState<'all' | 'pending' | 'completed'>('all');

  const filteredTasks = taskList.filter((task) => {
    if (filter === 'pending') return !task.isCompleted;
    if (filter === 'completed') return task.isCompleted;
    return true;
  });

  return (
    <>
      <div className={styles.filterButtons}>
        <button
          className={`${styles.filterButton} ${filter === 'all' ? styles.active : ''}`}
          onClick={() => setFilter('all')}
        >
          All
        </button>
        <button
          className={`${styles.filterButton} ${filter === 'pending' ? styles.active : ''}`}
          onClick={() => setFilter('pending')}
        >
          Pending
        </button>
        <button
          className={`${styles.filterButton} ${filter === 'completed' ? styles.active : ''}`}
          onClick={() => setFilter('completed')}
        >
          Completed
        </button>
      </div>

      <ul className={styles.taskList}>
        {filteredTasks.length <= 0 ? (
          <div className={styles.emptyContent}>
            <h1 className={styles.tasksEmpty}>Empty 📁</h1>
          </div>
        ) : (
          filteredTasks.map((task) => (
            <li key={task.id} className={styles.taskItem}>
              <span className={styles.checkbox}>
                <Input
                  onClick={() => toggleCompleteTask(task.id)}
                  type="checkbox"
                  checked={task.isCompleted}
                  onChange={(e) => e}
                  className={styles.customCheckbox}
                />
              </span>
              <div
                className={`${styles.taskContent} ${task.isCompleted && styles.completed
                  }`}
                onDoubleClick={() => toggleCompleteTask(task.id)}
              >
                {task.title}
              </div>
              <div className={styles.actionButtons}>
                <button
                  onClick={() => startEditingTask(task)}
                  className={styles.editButton}
                  disabled={task.isCompleted}
                >
                  {!task.isCompleted && "🖊️"}
                </button>
                <button
                  onClick={() => deleteTask(task.id)}
                  className={styles.deleteButton}
                >
                  🗑️
                </button>
              </div>
            </li>
          ))
        )}
      </ul>
    </>
  );
}

export default React.memo(TaskList);
