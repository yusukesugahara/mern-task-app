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
  const [priority, setPriority] = useState('1');

  useEffect(() => {
    // タスクのデータを取得してステートに設定
    axios.get(`http://localhost:5000/tasks/${id}`)
      .then(response => {
        const task = response.data;
        setTitle(task.title);
        setDescription(task.description);
        setDeadline(task.deadline ? task.deadline.split('T')[0] : ''); // フォーマットを調整
        setPriority(task.priority);
      })
      .catch(error => {
        console.error('Error fetching task:', error);
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

  const onDelete = () => {
    console.log('ddd')
    axios.delete(`http://localhost:5000/tasks/${id}`)
      .then(res => {
        console.log('Task deleted:', res.data);
        navigate('/');
      })
      .catch(error => {
        console.error('Error deleting task:', error);
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
            <option value="2">高</option>
            <option value="1">中</option>
            <option value="0">低</option>
          </select>
        </div>
        <div>
          <input type="submit" value="Update Task" />
          <button onClick={onDelete} className="delete-button" style={{ marginTop: '10px' }}>Delete Task</button>
        </div>
      </form>
    </div>
  );
}

export default EditTask;
