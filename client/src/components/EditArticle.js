import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';
import "./ArticleForm.css";

export default function EditArticle() {
    const { id } = useParams();
    const navigate = useNavigate();
    const editorRef = useRef(null);
    const [quill, setQuill] = useState(null);
    const [form, setForm] = useState({
        title: '',
        content: '',
        summary: '',
        tags: '',
        category: '',
        visibility: 'public',
    });
    const [error, setError] = useState('');

    // Initialize Quill
    useEffect(() => {
        if (editorRef.current && !quill) {
            const q = new Quill(editorRef.current, {
                theme: 'snow'
            });
            setQuill(q);
        }
    }, [editorRef, quill]);

    // Load Article Data
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
                if (quill) {
                    quill.root.innerHTML = content; // Preload content
                }
            } catch (err) {
                console.error('Error fetching article:', err);
                setError('Failed to load article for editing.');
            }
        };

        fetchArticle();
    }, [id, quill]);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const contentHTML = quill?.root.innerHTML || '';

        try {
            const updatedData = {
                ...form,
                content: contentHTML,
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
                <h1>Edit Article</h1>
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
                <div ref={editorRef} className="quill-editor" id="editor"></div>

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
                <select
                    name="visibility"
                    value={form.visibility}
                    onChange={handleChange}
                >
                    <option value="public">Public</option>
                    <option value="private">Private</option>
                </select>

                <button type="submit">Update Article</button>
            </form>
        </div>
    );
}
