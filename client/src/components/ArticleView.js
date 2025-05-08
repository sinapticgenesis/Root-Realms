import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './ArticleView.css';

export default function ArticleView() {
    const { id } = useParams(); // get :id from the URL
    const [article, setArticle] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        axios.get(`http://localhost:5000/api/articles/${id}`)
        .then(res => setArticle(res.data))
        .catch(err => {
            console.error('❌ Error loading article:', err);
            setError('Failed to load article.');
        });
    }, [id]);

    if (error) return <p className="error">{error}</p>;
    if (!article) return <p>Loading...</p>;

    return (
        <div className="article-view">
            <h1>{article.title}</h1>
            <p className="summary"><strong>Summary:</strong> {article.summary}</p>
            <p className="content">{article.content}</p>
            <p><strong>Category:</strong> {article.category}</p>
            <p><strong>Tags:</strong> {article.tags.join(', ')}</p>
        </div>
    );
}