const mongoose = require('mongoose');
const posts = require('./routes/posts');
const express = require('express');
const app = express();

mongoose
  .connect('mongodb://localhost:27017/blog-posts')
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('Failed to connect to MongoDB', err);
  });

app.set('views', './views');

app.use(express.json());
app.use('/api/posts', posts);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
