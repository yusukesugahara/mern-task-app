import React, { useState } from 'react';
import axios from 'axios';
import './CreateTask.css';

const CreateTask = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [deadline, setDeadline] = useState('');
  const [priority, setPriority] = useState('Medium');

  const onSubmit = (e) => {
    e.preventDefault();

    const newTask = {
      title,
      description,
      deadline,
      priority
    };

    axios.post('/api/tasks/add', newTask)
      .then(res => console.log(res.data));

    setTitle('');
    setDescription('');
    setDeadline('');
    setPriority('1');
  }

  return (
    <div>
      <h3>Create New Task</h3>
      <form onSubmit={onSubmit}>
        <div>
          <label>タスク名: </label>
          <input type="text" required value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>
        <div>
          <label>詳細: </label>
          <input type="text-area" value={description} onChange={(e) => setDescription(e.target.value)} />
        </div>
        <div>
          <label>期限: </label>
          <input
            type="date"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
          />
        </div>
        <div>
          <label>優先度: </label>
          <select value={priority} onChange={(e) => setPriority(e.target.value)}>
            <option value="2">高</option>
            <option value="1">中</option>
            <option value="0">低</option>
          </select>
        </div>
        <div>
          <input type="submit" value="Create Task" />
        </div>
      </form>
    </div>
  );
}

export default CreateTask;
