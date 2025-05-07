const mongoose = require('mongoose');

const ArticleSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String },
  summary: { type: String },
  tags: [String],
  visibility: {
    type: String,
    enum: ['public', 'private'],
    default: 'private'
  },
  category: { type: String },
//   owner: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'User',
//     required: true
//   },
//   referencedArticles: [{
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'Article'
//   }],
//   createdAt: {
//     type: Date,
//     default: Date.now
//   }
});

module.exports = mongoose.model('Article', ArticleSchema);
