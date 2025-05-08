import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import "./ArticleList.css";

export default function ArticleList() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:5000/api/articles')
      .then(res => {
        setArticles(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching articles:', err);
        setError('Failed to load articles.');
        setLoading(false);
      });
  }, []);

  return (
    <div className="article-list-container">
      <h1>Articles</h1>
      {loading && <p>Loading articles...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <ul className="article-list">
        {articles.map(article => (
          <li key={article._id} className="article-item">
            <Link to={`/articles/${article._id}`} className="article-link">
              <h3>{article.title}</h3>
              <p>{article.summary}</p>
              <i>Tags: {article.tags.join(', ')}</i>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
