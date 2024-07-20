import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './TaskList.css';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/tasks/')
      .then(response => {
        setTasks(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  const deleteTask = (id) => {
    axios.delete(`http://localhost:5000/tasks/${id}`)
    .then(response => {
      console.log(response.data);
      setTasks(tasks.filter(task => task._id !== id));
    })
    .catch(error => {
      console.error(error);
    });
  }

  return (
    <div>
      <h3>Task List</h3>
      <ul>
        {tasks.map(task => (
          <li key={task._id}>
            <Link to={`/task/${task._id}`}>{task.title}</Link>
            <Link to={`/edit/${task._id}`} className="btn btn-primary" style={{ marginLeft: '10px' }}>Edit</Link>
            <button onClick={() => deleteTask(task._id)} className="btn btn-danger" style={{ marginLeft: '10px' }}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TaskList;