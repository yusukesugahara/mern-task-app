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
  const deadline = req.body.deadline;
  const priority = req.body.priority;

  const newTask = new Task({ title, description, deadline, priority});

  newTask.save()
    .then(() => res.json('Task added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

// 特定のタスクの取得
router.route('/:id').get((req, res) => {
  Task.findById(req.params.id)
    .then(task => res.json(task))
    .catch(err => res.status(400).json('Error: ' + err));
});

// タスクの更新
router.route('/update/:id').post((req, res) => {
  console.log('Update request received for task ID:', req.params.id);
  console.log('Request body:', req.body);

  Task.findById(req.params.id)
    .then(task => {
      task.title = req.body.title;
      task.description = req.body.description;
      task.deadline = req.body.deadline;
      task.priority = req.body.priority;

      task.save()
        .then(() => {
          console.log('Task updated successfully');
          res.json('Task updated!');
        })
        .catch(err => {
          console.error('Error saving task:', err);
          res.status(400).json('Error: ' + err);
        });
    })
    .catch(err => {
      console.error('Error finding task:', err);
      res.status(400).json('Error: ' + err);
    });
});

// タスクの削除
router.route('/:id').delete((req, res) => {
  Task.findByIdAndDelete(req.params.id)
    .then(() => res.json('Task deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
