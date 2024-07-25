const router = require('express').Router();
let Task = require('../models/task.model');

// タスクの取得
router.route('/').get((req, res) => {
  Task.find()
    .then(tasks => {
      const updatedTasks = tasks.map(task => ({
        ...task._doc,
        priority: task.priority === 2 ? '高' : task.priority === 1 ? '中' : '低'
      }));
      res.json(updatedTasks);
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

// タスクの追加
router.route('/add').post((req, res) => {
  const title = req.body.title;
  const description = req.body.description;
  const deadline = req.body.deadline;
  const priority = req.body.priority === '高' ? 2 : req.body.priority === '中' ? 1 : 0;
  const completed = req.body.completed;

  const newTask = new Task({ title, description, deadline, priority, completed });

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
  Task.findById(req.params.id)
    .then(task => {
      task.title = req.body.title;
      task.description = req.body.description;
      task.deadline = req.body.deadline;
      task.priority = req.body.priority === '高' ? 2 : req.body.priority === '中' ? 1 : 0;
      task.completed = req.body.completed;

      task.save()
        .then(() => res.json('Task updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

// タスクの完了
router.route('/complete/:id').post((req, res) => {
  Task.findById(req.params.id)
    .then(task => {
      task.completed = true;
      task.save()
        .then(() => res.json('Task completed!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

// タスクの未完了状態に戻す
router.route('/uncomplete/:id').post((req, res) => {
  Task.findById(req.params.id)
    .then(task => {
      task.completed = false;
      task.save()
        .then(() => res.json('Task uncompleted!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

// タスクの削除
router.route('/:id').delete((req, res) => {
  Task.findByIdAndDelete(req.params.id)
    .then(() => res.json('Task deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
