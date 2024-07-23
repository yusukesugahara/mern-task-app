import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import './TaskDetail.css';

const TaskDetail = () => {
  const { id } = useParams();
  const [task, setTask] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:5000/tasks/${id}`)
      .then(response => {
        setTask(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, [id]);

  if (!task) {
    return <div>Loading...</div>;
  }

  return (
    <div className="task-detail">
      <h2>{task.title}</h2>
      <table>
    <tbody>
      <tr>
        <td><strong>Description:</strong></td>
        <td>{task.description}</td>
      </tr>
      <tr>
        <td><strong>Deadline:</strong></td>
        <td>{task.deadline ? task.deadline.split('T')[0] : ''}</td>
      </tr>
      <tr>
        <td><strong>Priority:</strong></td>
        <td>{task.priority}</td>
      </tr>
      <tr>
        <td><strong>Status:</strong></td>
        <td>{task.completed ? 'Completed' : 'Incomplete'}</td>
      </tr>
    </tbody>
  </table>
      <Link to={`/edit/${task._id}`} className="btn btn-primary">Edit</Link>
      <Link to="/" className="btn btn-secondary" style={{ marginLeft: '10px' }}>Back</Link>
    </div>
  );
}

export default TaskDetail;