import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import "./ArticleForm.css"

export default function EditArticle() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: '',
    content: '',
    summary: '',
    tags: '',
    category: '',
    visibility: 'public',
  });
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/articles/${id}`);
        const { title, content, summary, tags, category, visibility } = res.data;
        setForm({
          title,
          content,
          summary,
          tags: tags.join(', '),
          category,
          visibility,
        });
      } catch (err) {
        console.error('Error fetching article:', err);
        setError('Failed to load article for editing.');
      }
    };

    fetchArticle();
  }, [id]);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();

    try {
      const updatedData = {
        ...form,
        tags: form.tags.split(',').map(tag => tag.trim()),
      };

      await axios.put(`http://localhost:5000/api/articles/${id}`, updatedData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      navigate(`/articles/${id}`);
    } catch (err) {
      console.error('Error updating article:', err);
      setError('Failed to update article.');
    }
  };

  return (
    <div className="article-form-container">
      <form className="article-form" onSubmit={handleSubmit}>
        <h2>Edit Article</h2>
        {error && <p className="error-message">{error}</p>}
        <input
          name="title"
          placeholder="Title"
          value={form.title}
          onChange={handleChange}
          required
        />
        <input
          name="summary"
          placeholder="Summary"
          value={form.summary}
          onChange={handleChange}
          required
        />
        <textarea
          name="content"
          placeholder="Content"
          value={form.content}
          onChange={handleChange}
          required
          id="content"
        />
        <input
          name="tags"
          placeholder="Tags (comma-separated)"
          value={form.tags}
          onChange={handleChange}
        />
        <input
          name="category"
          placeholder="Category"
          value={form.category}
          onChange={handleChange}
        />
        <select name="visibility" value={form.visibility} onChange={handleChange}>
          <option value="public">Public</option>
          <option value="private">Private</option>
        </select>
        <button type="submit">Update Article</button>
      </form>
    </div>
  );
}
