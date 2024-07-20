import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css'; // グローバルスタイルのインポート

import Navbar from './components/Navbar';
import CreateTask from './components/CreateTask';
import TaskList from './components/TaskList';
import TaskDetail from './components/TaskDetail';
import EditTask from './components/EditTask';

const App = () => {
  return (
    <Router>
      <div className="container">
        <Navbar />
        <Routes>
          <Route path="/" element={<TaskList />} />
          <Route path="/create" element={<CreateTask />} />
          <Route path="/task/:id" element={<TaskDetail />} />
          <Route path="/edit/:id" element={<EditTask />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
