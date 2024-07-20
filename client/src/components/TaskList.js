import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from './Navbar';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/tasks/')
    .then(response => {
      setTasks(response.data);
    })
    .catch((error) => {
      console.log(error);
    })
  }, []);

  return (
    <div>
      <h3>Task List</h3>
      <ul>
        {tasks.map(task => (
          <li key={task._id}>{task.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default TaskList;
