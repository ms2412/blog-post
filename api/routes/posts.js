const BlogPost = require('../models/posts');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

// Get all blog posts
router.get('/api/posts', async (req, res) => {
  try {
    const posts = await BlogPost.find();
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new blog post
router.post('/api/posts', async (req, res) => {
  const { title, author, content } = req.body;
  const newPost = new BlogPost({ title, author, content });
  try {
    const savedPost = await newPost.save();
    res.status(201).json(savedPost);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update a blog post
router.put('/api/posts/:id', async (req, res) => {
  const { id } = req.params;
  const { title, author, content } = req.body;
  try {
    const updatedPost = await BlogPost.findByIdAndUpdate(
      id,
      { title, author, content },
      { new: true }
    );
    res.json(updatedPost);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a blog post
router.delete('/api/posts/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await BlogPost.findByIdAndDelete(id);
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
