const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Article = require('../models/Article');

// GET all public articles
router.get('/', async (req, res) => {
    try {
      console.log("Fetching public articles...");
      const articles = await Article.find({ visibility: 'public' });
      res.json(articles);
    } catch (err) {
      console.error("Error fetching articles:", err);
      res.status(500).json({ message: 'Failed to fetch articles' });
    }
  });
  
// POST /api/articles - create a new article
router.post('/', async (req, res) => {
    try {
        console.log('Incoming article POST:', req.body)
        const { title, content, summary, tags, category, visibility } = req.body;
    
        // Basic validation
        if (!title || !visibility) {
            console.log('Missing required fields');
            return res.status(400).json({ message: 'Title and visibility are required.' });
        }
    
        const newArticle = new Article({
            title,
            content,
            summary,
            tags,
            category,
            visibility
        });
    
        const saved = await newArticle.save();
        console.log('Article saved:', saved);
        res.status(201).json(saved);
    } catch (err) {

        console.error('Error saving article:', err);
        res.status(500).json({ message: 'Server error while saving article' });
    }
});

// GET /api/articles/:id - fetch one article by ID
router.get('/:id', async (req, res) => {
    const { id } = req.params;
  
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: 'Invalid article ID' });
    }
  
    try {
        const article = await Article.findById(id);
        if (!article) {
            return res.status(404).json({ message: 'Article not found' });
        }
        res.json(article);
    } catch (err) {
        console.error('Error fetching article:', err);
        res.status(500).json({ message: 'Error fetching article' });
    }
});
  
  
module.exports = router;
