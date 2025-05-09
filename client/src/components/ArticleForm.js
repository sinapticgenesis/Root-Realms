import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './ArticleForm.css';
import Quill from 'quill';
import 'quill/dist/quill.snow.css'; // if not already imported

export default function ArticleForm() {
    const token = localStorage.getItem('token');
    const editorRef = useRef(null);
    const [quill, setQuill] = useState(null);

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

    useEffect(() => {
        if (editorRef.current && !quill) {
            const q = new Quill(editorRef.current, {
                theme: 'snow'
            });
            setQuill(q);
        }
    }, [editorRef, quill]);
    
    
    if (!token) {
        return <p>You must be logged in to create an article.</p>;
    }

    const handleChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async e => {
        e.preventDefault();

        const contentHTML = quill?.root.innerHTML.trim() || '';

        // Basic Validation Check
        if (
            !formData.title.trim() ||
            !formData.summary.trim() ||
            !formData.tags.trim() ||
            !formData.category.trim() ||
            !contentHTML
        ) {
            setError('Please fill out all fields before submitting.');
            setSuccess('');
            return;
        }

        try {
            const payload = {
                ...formData,
                content: contentHTML,
                tags: formData.tags.split(',').map(tag => tag.trim())
            };

            const res = await axios.post('http://localhost:5000/api/articles', payload, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });

            setSuccess(`Article created: ${res.data.title}`);
            setError('');
            setFormData({
                title: '', content: '', summary: '', tags: '', category: '', visibility: 'public'
            });

            if (quill) {
                quill.setContents([]);
            }
        } catch (err) {
            console.error(err);
            setError('Failed to create article.');
            setSuccess('');
        }
    };


  return (
    
    <div className="article-form-container">
        <form className="article-form" onSubmit={handleSubmit}>
            <h1>Create New Article</h1>
            <input name="title" placeholder="Title" value={formData.title} onChange={handleChange} required />
            <textarea id="summary" name="summary" placeholder="Summary" value={formData.summary} onChange={handleChange} required />
            <div ref={editorRef} className="quill-editor" id="editor" required ></div>
            <input name="category" placeholder="Category" value={formData.category} onChange={handleChange} required />
            <input name="tags" placeholder="Tags (comma separated)" value={formData.tags} onChange={handleChange} required />
            <select name="visibility" value={formData.visibility} onChange={handleChange} required>
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
