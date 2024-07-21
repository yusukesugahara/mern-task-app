import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './EditTask.css';

const EditTask = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [deadline, setDeadline] = useState('');
  const [priority, setPriority] = useState('Medium');

  useEffect(() => {
    axios.get(`http://localhost:5000/tasks/${id}`)
      .then(response => {
        setTitle(response.data.title);
        setDescription(response.data.description);
        setDeadline(response.data.deadline ? response.data.deadline.split('T')[0] : ''); // フォーマットを調整
        setPriority(response.data.priority);
      })
      .catch(error => {
        console.error(error);
      });
  }, [id]);

  const onSubmit = (e) => {
    e.preventDefault();

    const updatedTask = {
      title,
      description,
      deadline,
      priority
    };

    console.log('Sending update request:', updatedTask);

    axios.post(`http://localhost:5000/tasks/update/${id}`, updatedTask)
      .then(res => {
        console.log('Response from server:', res.data);
        navigate('/');
      })
      .catch(error => {
        console.error(error);
      });
  }

  return (
    <div className="edit-task">
      <h3>Edit Task</h3>
      <form onSubmit={onSubmit}>
        <div>
          <label>Title: </label>
          <input
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label>Description: </label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div>
          <label>Deadline: </label>
          <input
            type="date"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
          />
        </div>
        <div>
          <label>Priority: </label>
          <select value={priority} onChange={(e) => setPriority(e.target.value)}>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>
        <div>
          <input type="submit" value="Update Task" />
        </div>
      </form>
    </div>
  );
}

export default EditTask;
