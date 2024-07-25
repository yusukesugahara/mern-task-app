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
  const [completed, setCompleted] = useState();

  useEffect(() => {
    // タスクのデータを取得してステートに設定
    axios.get(`http://localhost:5000/tasks/${id}`)
      .then(response => {
        const task = response.data;
        setTitle(task.title);
        setDescription(task.description);
        setDeadline(task.deadline ? task.deadline.split('T')[0] : ''); // フォーマットを調整
        setPriority(task.priority);
        setCompleted(task.completed);
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
    axios.delete(`http://localhost:5000/tasks/${id}`)
      .then(res => {
        console.log('Task deleted:', res.data);
        navigate('/');
      })
      .catch(error => {
        console.error('Error deleting task:', error);
      });
    }

    const completeTask = () => {
      const updatedTask = {
        title,
        description,
        deadline,
        priority,
        completed: true
      };
  
      axios.post(`http://localhost:5000/tasks/update/${id}`, updatedTask)
        .then(res => {
          console.log('Task completed:', res.data);
          setCompleted(true);
        })
        .catch(error => {
          console.error('Error completing task:', error);
        });
    }
  
    const uncompleteTask = () => {
      const updatedTask = {
        title,
        description,
        deadline,
        priority,
        completed: false
      };
  
      axios.post(`http://localhost:5000/tasks/update/${id}`, updatedTask)
        .then(res => {
          console.log('Task uncompleted:', res.data);
          setCompleted(false);
        })
        .catch(error => {
          console.error('Error uncompleting task:', error);
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
          {!completed ? (
            <button onClick={() => completeTask(id)} className="btn btn-success" style={{ marginLeft: '10px' }}>Complete</button>
          ) : (
            <button onClick={() => uncompleteTask(id)} className="btn btn-warning" style={{ marginLeft: '10px' }}>Uncomplete</button>
          )}
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
