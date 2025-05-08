import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import './ArticleView.css';

export default function ArticleView() {
    const { id } = useParams();
    const [article, setArticle] = useState(null);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const loggedInUsername = localStorage.getItem('username');

    useEffect(() => {
        const fetchArticle = async () => {
          try {
            const res = await axios.get(`http://localhost:5000/api/articles/${id}`);
            setArticle(res.data);
          } catch (err) {
            console.error('Error loading article:', err);
            setError('Failed to load article.');
          }
        };
      
        fetchArticle();
      }, [id]);
      
    const handleDelete = async () => {
        const confirmDelete = window.confirm('Are you sure you want to delete this article?');
        if (!confirmDelete) return;
    
        try {
            await axios.delete(`http://localhost:5000/api/articles/${id}`, {
                headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            navigate('/dashboard');
        } catch (err) {
            console.error('Error deleting article:', err);
            alert('Failed to delete article.');
        }
    };

    if (error) return <p className="error">{error}</p>;
    if (!article) return <p>Loading...</p>;

    const isOwner = article.owner?.username === loggedInUsername;

    return (
        <div className="article-view">
            <h1>{article.title}</h1>
            <p><strong>Category:</strong> {article.category}</p>
            <p><strong>Tags:</strong> {article.tags.join(', ')}</p>
            <hr />
            <p>{article.content}</p>
            <hr />
            {isOwner && (
                <div style={{ marginTop: '1rem' }}>
                    <Link to={`/edit/${article._id}`}>
                        <button style={{ marginRight: '1rem' }}>Edit</button>
                    </Link>
                    <button onClick={handleDelete} style={{ backgroundColor: '#d9534f', color: 'white' }}>
                        Delete
                    </button>
                </div>
            )} 
        </div>
    );
}