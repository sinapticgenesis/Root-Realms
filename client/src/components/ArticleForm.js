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

        const contentHTML = quill?.root.innerHTML || '';

        try {
            const payload = {
                ...formData,
                content: contentHTML,
                tags: formData.tags.split(',').map(tag => tag.trim()) // convert comma list to array
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
            <h2>Create New Article</h2>
            <input name="title" placeholder="Title" value={formData.title} onChange={handleChange} required />
            <textarea id="summary" name="summary" placeholder="Summary" value={formData.summary} onChange={handleChange} />
            <div
            ref={editorRef}
            style={{
                height: '200px',
                marginBottom: '1rem',
                backgroundColor: 'white',
                borderRadius: '8px'
            }}
            id="editor"
            ></div>
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
