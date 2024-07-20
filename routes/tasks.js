const router = require('express').Router();
let Task = require('../models/task.model');

// タスクの取得
router.route('/').get((req, res) => {
  Task.find()
    .then(tasks => res.json(tasks))
    .catch(err => res.status(400).json('Error: ' + err));
});

// タスクの追加
router.route('/add').post((req, res) => {
  const title = req.body.title;
  const description = req.body.description;

  const newTask = new Task({ title, description });

  newTask.save()
    .then(() => res.json('Task added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

// タスクの削除
router.route('/:id').delete((req, res) => {
  Task.findByIdAndDelete(req.params.id)
    .then(() => res.json('Task deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
