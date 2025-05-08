import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import "./ArticleList.css";

export default function ArticleList() {
  const [articles, setArticles] = useState([]);
  const [search, setSearch] = useState('');
  const [tag, setTag] = useState('');
  const [category, setCategory] = useState('');
  const [allTags, setAllTags] = useState([]);
  const [allCategories, setAllCategories] = useState([]);

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async (filters = {}) => {
    try {
      const params = new URLSearchParams(filters).toString();
      const res = await axios.get(`http://localhost:5000/api/articles?${params}`);
      setArticles(res.data);

      // Extract unique tags and categories from results
      const tagsSet = new Set();
      const categoriesSet = new Set();

      res.data.forEach(a => {
        a.tags.forEach(tag => tagsSet.add(tag));
        if (a.category) categoriesSet.add(a.category);
      });

      setAllTags([...tagsSet]);
      setAllCategories([...categoriesSet]);
    } catch (err) {
      console.error('Error fetching articles:', err);
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    fetchArticles({ search, tag, category });
  };

  const handleClear = () => {
    setSearch('');
    setTag('');
    setCategory('');
    fetchArticles();
  };
  
  return (
    <div className="article-list-container">
      <h1>Articles</h1>
      <form onSubmit={handleSubmit} className="article-filter-form">
        <input
          type="text"
          placeholder="Search by title..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />

        <select value={tag} onChange={e => setTag(e.target.value)}>
          <option value="">All Tags</option>
          {allTags.map(t => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>

        <select value={category} onChange={e => setCategory(e.target.value)}>
          <option value="">All Categories</option>
          {allCategories.map(c => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>

        <button type="submit">Apply Filters</button>
        <button type="button" onClick={handleClear}>Clear Filters</button>
      </form>

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
