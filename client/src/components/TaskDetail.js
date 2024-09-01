import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import './TaskDetail.css';
import apiUrl from '../config'; 

const TaskDetail = () => {
  const { id } = useParams();
  const [task, setTask] = useState(null);

  useEffect(() => {
    axios.get(`${apiUrl}/api/tasks/${id}`)
      .then(response => {
        setTask(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, [id]);

  const completeTask = () => {
    axios.post(`${apiUrl}/api/tasks/complete/${id}`)
      .then(response => {
        console.log(response.data);
        setTask(prevTask => ({ ...prevTask, completed: true }));
      })
      .catch(error => {
        console.error(error);
      });
  }

  if (!task) {
    return <div>Loading...</div>;
  }


  const priorityTask = (priority) => {
    console.log(priority);
    switch (String(priority)) { // 文字列として扱うように変更
      case '2':
        return "高";
      case '1':
        return "中";
      case '0':
        return "低";
      default:
        return '';
    }
  }

  const getPriorityClass = (priority) => {
    switch (String(priority)) { // 文字列として扱うように変更
      case '2':
        return 'priority-high task-priority';
      case '1':
        return 'priority-medium task-priority';
      case '0':
        return 'priority-low task-priority';
      default:
        return '';
    }
  }


  return (
    <div className="task-detail">
      <h2>{task.title}</h2>
      <p>{task.description}</p>
      <p>Deadline: {task.deadline ? new Date(task.deadline).toLocaleDateString() : 'None'}</p>
      <p>Priority: <span className={getPriorityClass(task.priority)}>
                {priorityTask(task.priority)}
              </span></p>
      <p>Status: {task.completed ? 'Completed' : 'Incomplete'}</p>
      <Link to={`/edit/${task._id}`} className="btn btn-primary">Edit</Link>
      {!task.completed && (
        <button onClick={completeTask} className="btn btn-success" style={{ marginLeft: '10px' }}>Complete</button>
      )}
      <Link to="/" className="btn btn-secondary" style={{ marginLeft: '10px' }}>Back</Link>
    </div>
  );
}

export default TaskDetail;
