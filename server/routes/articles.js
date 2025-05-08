const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Article = require('../models/Article');

// GET all public articles
router.get('/', async (req, res) => {
    try {
        const { search, tag, category } = req.query;

        let query = { visibility: 'public' };
    
        if (search) {
          query.title = { $regex: search, $options: 'i' }; // case-insensitive title search
        }
    
        if (tag) {
          query.tags = tag;
        }
    
        if (category) {
          query.category = category;
        }
    
        const articles = await Article.find(query).populate('owner', 'username');
        res.json(articles);
    } catch (err) {
      console.error("Error fetching articles:", err);
      res.status(500).json({ message: 'Failed to fetch articles' });
    }
  });
  
const { verifyToken, verifyTokenOptional } = require('../middleware/auth');

// POST /api/articles - create a new article (only if logged in)
router.post('/', verifyToken, async (req, res) => {
    console.log('User from token:', req.user);
    try {
        const { title, content, summary, tags, category, visibility } = req.body;

        if (!title || !content || !summary || !tags || !category || !visibility) {
        return res.status(400).json({ message: 'All fields are required.' });
        }

        const newArticle = new Article({
        title,
        content,
        summary,
        tags,
        category,
        visibility,
        owner: req.user.id
        });

        const saved = await newArticle.save();
        res.status(201).json(saved);
    } catch (err) {
        console.error('Error saving article:', err);
        res.status(500).json({ message: 'Server error while saving article' });
    }
});

// GET /api/articles/user - fetch articles by the logged-in user
router.get('/user', verifyToken, async (req, res) => {
    const userId = req.user.id;
  
    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: 'Invalid article ID' });
    }
  
    try {
      const articles = await Article.find({ owner: userId });
      res.json(articles);
    } catch (err) {
      console.error('Error fetching user articles:', err);
      res.status(500).json({ message: 'Failed to fetch your articles' });
    }
  });

// PUT /api/articles/:id - update article (only if owner)
router.put('/:id', verifyToken, async (req, res) => {
    try {
        const article = await Article.findById(req.params.id);
    
        if (!article) return res.status(404).json({ message: 'Article not found' });
        if (article.owner.toString() !== req.user.id)
            return res.status(403).json({ message: 'Not authorized to edit this article' });
    
        Object.assign(article, req.body); // apply updates
        const updated = await article.save();
        res.json(updated);
    } catch (err) {
        res.status(500).json({ message: 'Error updating article' });
    }
});

// DELETE /api/articles/:id - delete article (only if owner)
router.delete('/:id', verifyToken, async (req, res) => {
    try {
        const article = await Article.findById(req.params.id);
    
        if (!article) return res.status(404).json({ message: 'Article not found' });
        if (article.owner.toString() !== req.user.id)
            return res.status(403).json({ message: 'Not authorized to delete this article' });
    
        await article.deleteOne();
        res.json({ message: 'Article deleted' });
    } catch (err) {
        res.status(500).json({ message: 'Error deleting article' });
    }
});
  
// GET /api/articles/:id - fetch a single article by ID
router.get('/:id', verifyTokenOptional, async (req, res) => {
    const articleId = req.params.id;
  
    // Validate ID
    if (!mongoose.Types.ObjectId.isValid(articleId)) {
        return res.status(400).json({ message: 'Invalid article ID' });
    }
  
    try {
        const article = await Article.findById(articleId).populate('owner', 'username');
        if (!article) return res.status(404).json({ message: 'Article not found' });
        
        const isOwner = req.user && req.user.id === article.owner._id.toString();
        const isPublic = article.visibility === 'public';
    
        if (!isPublic && !isOwner) {
            return res.status(403).json({ message: 'You do not have permission to view this article' });
        }

        res.json(article);
    } catch (err) {
        console.error('Error fetching article:', err);
        res.status(500).json({ message: 'Failed to load article' });
    }
});

module.exports = router;
