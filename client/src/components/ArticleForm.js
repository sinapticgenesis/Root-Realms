import React, { useState } from 'react';
import axios from 'axios';
import './ArticleForm.css';

export default function ArticleForm() {
    const [formData, setFormData] = useState({
        title: '',
        content: '',
        summary: '',
        tags: '',
        category: '',
        visibility: 'public'
    });

    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');

    const handleChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
        const payload = {
            ...formData,
            tags: formData.tags.split(',').map(tag => tag.trim()) // convert comma list to array
        };
        const res = await axios.post('http://localhost:5000/api/articles', payload);
        setSuccess(`Article created: ${res.data.title}`);
        setFormData({
            title: '', content: '', summary: '', tags: '', category: '', visibility: 'public'
        });
    } catch (err) {
        console.error(err);
        setError('Failed to create article.');
    }
  };

  return (
    <div className="article-form-container">
        <form className="article-form" onSubmit={handleSubmit}>
            <h2>Create New Article</h2>
            <input name="title" placeholder="Title" value={formData.title} onChange={handleChange} required />
            <textarea id="summary" name="summary" placeholder="Summary" value={formData.summary} onChange={handleChange} />
            <textarea id="content" name="content" placeholder="Content" value={formData.content} onChange={handleChange} />
            <input name="tags" placeholder="Tags (comma separated)" value={formData.tags} onChange={handleChange} />
            <input name="category" placeholder="Category" value={formData.category} onChange={handleChange} />
            <select name="visibility" value={formData.visibility} onChange={handleChange}>
            <option value="public">Public</option>
            <option value="private">Private</option>
            </select>
            <button type="submit">Create Article</button>
            {success && <p className="success">{success}</p>}
            {error && <p className="error">{error}</p>}
        </form>
    </div>
  );
}
