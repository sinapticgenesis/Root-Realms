import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function ArticleSearch() {
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
    <div className="article-search">
      <h1>Search Articles</h1>
      {loading && <p>Loading articles...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <ul>
        {articles.map(article => (
          <li key={article._id}>
            <Link to={`/articles/${article._id}`}>{article.title}</Link>
            <p>{article.summary}</p>
            <i>Tags: {article.tags.join(', ')}</i>
          </li>
        ))}
      </ul>
    </div>
  );
}
