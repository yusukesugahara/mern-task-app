import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import CreateTask from './components/CreateTask';
import TaskList from './components/TaskList';

const App = () => {
    return (
        <Router>
            <div className="container">
                <Routes>
                    <Route path="/" element={<TaskList />} />
                    <Route path="/create" element={<CreateTask />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
