import React from "react";
import styles from './TaskList.module.scss'
import Input from "../../../components/input/Input";
import { Task } from "../TodoList";

interface TaskListProps {
  taskList: Task[];
  toggleCompleteTask: (taskId: number) => void;
  startEditingTask: (task: Task) => void;
  deleteTask: (taskId: number) => void;
}

function TaskList({ taskList, toggleCompleteTask, startEditingTask, deleteTask }: TaskListProps) {

  return (
    <ul className={styles.taskList}>
      {taskList.length <= 0 ?
        (
          <div className={styles.taskItem}><h1 className={styles.tasksEmpty}> You don't have tasks❗</h1></div>
        ) :
        taskList.map((task) => (
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
            <div className={`${styles.taskContent} ${task.isCompleted && styles.completed}`}>
              {task.title}
            </div>
            <div className={styles.actionButtons}>
              <button onClick={() => startEditingTask(task)} className={styles.editButton} disabled={task.isCompleted}>{!task.isCompleted && '🖊️'}</button>
              <button onClick={() => deleteTask(task.id)} className={styles.deleteButton}>🗑️</button>
            </div>
          </li>
        ))
      }
    </ul>
  );
}

export default React.memo(TaskList);