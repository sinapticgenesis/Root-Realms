const express = require('express');
const router = express.Router();
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
  
module.exports = router;
