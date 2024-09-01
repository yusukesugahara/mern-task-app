const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const taskRouter = require('./routes/tasks'); // tasks ルーターをインポート

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

// MongoDB 接続
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('MongoDB connected');
    // サーバーをMongoDB接続が成功した後にのみ起動
    app.listen(PORT, () => {
      console.log(`Server is running on port: ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
    process.exit(1); // 接続エラー時にプロセスを終了
  });

// API ルート
app.use('/api/tasks', taskRouter); // /api/tasks エンドポイントを設定

// フロントエンドの静的ファイルを提供
app.use(express.static(path.join(__dirname, 'client/build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

// 全体のエラーハンドリングミドルウェア
app.use((err, req, res, next) => {
  console.error('An error occurred:', err.message);
  res.status(500).json({ error: 'Internal Server Error' });
});

// Vercelでは、サーバーをエクスポートする必要があります
module.exports = app;