import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './EditTask.css';

const EditTask = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    axios.get(`http://localhost:5000/tasks/${id}`)
      .then(response => {
        setTitle(response.data.title);
        setDescription(response.data.description);
        setCompleted(response.data.completed);
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
      completed
    };

    axios.post(`http://localhost:5000/tasks/update/${id}`, updatedTask)
      .then(res => {
        console.log(res.data);
        navigate('/');
      });
  }

  return (
    <div>
      <h3>Edit Task</h3>
      <form onSubmit={onSubmit}>
        <div>
          <label>Title: </label>
          <input type="text" required value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>
        <div>
          <label>Description: </label>
          <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
        </div>
        <div>
          <label>Completed: </label>
          <input type="checkbox" checked={completed} onChange={(e) => setCompleted(e.target.checked)} />
        </div>
        <div>
          <input type="submit" value="Update Task" />
        </div>
      </form>
    </div>
  );
}

export default EditTask;
