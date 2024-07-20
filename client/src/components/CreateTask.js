import React, { useState } from 'react';
import axios from 'axios';

const CreateTask = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const onSubmit = (e) => {
    e.preventDefault();

    const newTask = {
      title: title,
      description: description
    };

    axios.post('http://localhost:5000/tasks/add', newTask)
      .then(res => console.log(res.data));

    setTitle('');
    setDescription('');
  }

  return (
    <div>
      <h3>Task List</h3>
      <h3>Create New Task</h3>
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
            <input type="submit" value="Create Task" />
          </div>
        </form>
      </div>
    );
}

export default CreateTask;
