import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './EditTask.css';

const EditTask = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    axios.get(`http://localhost:5000/tasks/${id}`)
      .then(response => {
        setTitle(response.data.title);
        setDescription(response.data.description);
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
          <input type="submit" value="Update Task" />
        </div>
      </form>
    </div>
  );
}

export default EditTask;
