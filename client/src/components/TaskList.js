import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './TaskList.css';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [sortType, setSortType] = useState(''); // 並び替えの種類を保持するステート
  const [showCompleted, setShowCompleted] = useState(false); // 完了タスクの表示を切り替えるステート


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

  const completeTask = (id) => {
    axios.post(`http://localhost:5000/tasks/complete/${id}`)
      .then(response => {
        console.log(response.data);
        setTasks(tasks.map(task => {
          if (task._id === id) {
            task.completed = true;
          }
          return task;
        }));
      })
      .catch(error => {
        console.error(error);
      });
  }

  const sortTasks = (type) => {
    let sortedTasks = [...tasks];
    if (type === 'priority') {
      const priorityOrder = { 'High': 1, 'Medium': 2, 'Low': 3 };
      sortedTasks.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
    } else if (type === 'deadline') {
      sortedTasks.sort((a, b) => new Date(a.deadline) - new Date(b.deadline));
    }
    setTasks(sortedTasks);
    setSortType(type);
  }

  const getDeadlineClass = (deadline) => {
    const now = new Date();
    const deadlineDate = new Date(deadline);
    const diffTime = deadlineDate - now;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays <= 1 || diffDays < 0) {
      return 'deadline-red';
    } else if (diffDays <= 3) {
      return 'deadline-green';
    } else {
      return '';
    }}

  const getPriorityClass = (priority) => {
    switch (priority) {
      case 'High':
        return 'priority-high task-priority ';
      case 'Medium':
        return 'priority-medium task-priority ';
      case 'Low':
        return 'priority-low task-priority ';
      default:
        return '';
    }
  }


  return (
    <div>
      <h3>Task List</h3>
      <div className="sort-buttons">
        <button onClick={() => setShowCompleted(!showCompleted)} className="btn btn-secondary">
          {showCompleted ? 'Show Incomplete' : 'Show Completed'}
        </button>
        <button onClick={() => sortTasks('priority')} className="btn btn-secondary">
          Sort by Priority
        </button>
        <button onClick={() => sortTasks('deadline')} className="btn btn-secondary">
          Sort by Deadline
        </button>
      </div>
      <ul>
        {tasks.filter(task => showCompleted ? task.completed : !task.completed).map(task => (
          <li key={task._id}>
            {!task.completed && (
                <button onClick={() => completeTask(task._id)} className="btn btn-success" style={{ marginLeft: '10px' }}>Complete</button>
              )}
            <Link to={`/edit/${task._id}`} className="btn btn-primary" style={{ marginLeft: '10px' }}>Edit</Link>
            <button onClick={() => deleteTask(task._id)} className="btn btn-danger" style={{ marginLeft: '10px' }}>Delete</button>
            <div className='task-priority-deadline'>
              <span className={getPriorityClass(task.priority)}>
                {task.priority}
              </span>
              &nbsp;|&nbsp;
              <span className={getDeadlineClass(task.deadline)}>
                {task.deadline ? new Date(task.deadline).toLocaleDateString() : 'None'}
              </span>
            </div>
            <Link to={`/task/${task._id}`} className="task-title">{task.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TaskList;
