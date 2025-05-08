import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './ArticleList.css'; // optional reuse

export default function MyArticles() {
  const [articles, setArticles] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchMyArticles = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('You must be logged in to view your articles.');
        return;
      }
  
      try {
        const res = await axios.get('http://localhost:5000/api/articles/user', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setArticles(res.data);
      } catch (err) {
        console.error('Axios error:', err);
        setError(err.response?.data?.message || 'Failed to load your articles.');
      }
    };
  
    fetchMyArticles();
  }, []);
  

  return (
    <div className="article-list-container">
      <h1>My Articles</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {articles.length === 0 ? (
        <p>You haven't written any articles yet.</p>
      ) : (
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
      )}
    </div>
  );
}
