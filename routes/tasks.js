const router = require('express').Router();
const Task = require('../models/task.model'); // モデルをインポート

// タスクの取得
router.route('/').get((req, res) => {
  Task.find()
    .then(tasks => {
      const updatedTasks = tasks.map(task => ({
        ...task._doc, // タスクオブジェクトのすべてのプロパティをコピー
        priority: task.priority === 2 ? '高' : task.priority === 1 ? '中' : '低' // 優先度を文字列に変換
      }));
      res.json(updatedTasks);
    })
    .catch(err => res.status(400).json({ error: 'Error: ' + err }));
});

// タスクの追加
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

// 特定のタスクの取得
router.route('/:id').get((req, res) => {
  Task.findById(req.params.id)
    .then(task => res.json(task))
    .catch(err => res.status(400).json({ error: 'Error: ' + err }));
});

// タスクの更新
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

// タスクの完了
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

// タスクの未完了状態に戻す
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

// タスクの削除
router.route('/:id').delete((req, res) => {
  Task.findByIdAndDelete(req.params.id)
    .then(() => res.json({ message: 'Task deleted.' }))
    .catch(err => res.status(400).json({ error: 'Error: ' + err }));
});

module.exports = router;
