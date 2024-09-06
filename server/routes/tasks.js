const router = require('express').Router();
const Task = require('../models/task.model');

router.route('/').get((req, res) => {
  Task.find()
    .then(tasks => {
      const updatedTasks = tasks.map(task => ({
        ...task._doc, 
        priority: task.priority === 2 ? '高' : task.priority === 1 ? '中' : '低' 
      }));
      res.json(updatedTasks);
    })
    .catch(err => res.status(400).json({ error: 'Error: ' + err }));
});

router.route('/add').post((req, res) => {
  const { title, description, deadline, priority, completed } = req.body;

  const newTask = new Task({
    title,
    description,
    deadline,
    priority: priority === '2' ? 2 : priority === '1' ? 1 : 0,
    completed
  });

  newTask.save()
    .then(() => res.json({ message: 'Task added!' }))
    .catch(err => res.status(400).json({ error: 'Error: ' + err }));
});

router.route('/:id').get((req, res) => {
  Task.findById(req.params.id)
    .then(task => res.json(task))
    .catch(err => res.status(400).json({ error: 'Error: ' + err }));
});

router.route('/update/:id').post((req, res) => {
  Task.findById(req.params.id)
    .then(task => {
      task.title = req.body.title;
      task.description = req.body.description;
      task.deadline = req.body.deadline;
      task.priority = req.body.priority === '2' ? 2 : req.body.priority === '1' ? 1 : 0;
      task.completed = req.body.completed;

      task.save()
        .then(() => res.json({ message: 'Task updated!' }))
        .catch(err => res.status(400).json({ error: 'Error: ' + err }));
    })
    .catch(err => res.status(400).json({ error: 'Error: ' + err }));
});

router.route('/complete/:id').post((req, res) => {
  Task.findById(req.params.id)
    .then(task => {
      task.completed = true;
      task.save()
        .then(() => res.json({ message: 'Task completed!' }))
        .catch(err => res.status(400).json({ error: 'Error: ' + err }));
    })
    .catch(err => res.status(400).json({ error: 'Error: ' + err }));
});

router.route('/uncomplete/:id').post((req, res) => {
  Task.findById(req.params.id)
    .then(task => {
      task.completed = false;
      task.save()
        .then(() => res.json({ message: 'Task uncompleted!' }))
        .catch(err => res.status(400).json({ error: 'Error: ' + err }));
    })
    .catch(err => res.status(400).json({ error: 'Error: ' + err }));
});

router.route('/:id').delete((req, res) => {
  Task.findByIdAndDelete(req.params.id)
    .then(() => res.json({ message: 'Task deleted.' }))
    .catch(err => res.status(400).json({ error: 'Error: ' + err }));
});

module.exports = router;
