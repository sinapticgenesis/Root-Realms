import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import './ArticleView.css';

export default function ArticleView() {
    const { id } = useParams();
    const [article, setArticle] = useState(null);
    const [allArticles, setAllArticles] = useState([]);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const loggedInUsername = localStorage.getItem('username');
    const token = localStorage.getItem('token');


    useEffect(() => {
        const fetchData = async () => {
          try {
            // Fetch main article (with token if available)
            const articleRes = await axios.get(`http://localhost:5000/api/articles/${id}`, {
                headers: token ? { Authorization: `Bearer ${token}` } : {}
            });
            setArticle(articleRes.data);

            // Fetch all articles for linking (no token required here)
            const allRes = await axios.get(`http://localhost:5000/api/articles`);

            // Allow linking only to public or self-owned articles
            const linkableArticles = allRes.data.filter(a =>
                a.visibility === 'public' || a.owner?.username === loggedInUsername
            );

                setAllArticles(linkableArticles);
            } catch (err) {
                console.error('Error loading article or list:', err);
                if (err.response?.status === 403) {
                    setError('You do not have permission to view this article.');
                } else {
                    setError('Failed to load article.');
                }
            }    
        };
      
        fetchData();
    }, [id, loggedInUsername, token]);
      
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

    const renderContentWithLinks = (text) => {
        const parts = text.split(/(\[\[.*?\]\])/g);
    
        return parts.map((part, index) => {
            const match = part.match(/\[\[(.*?)\]\]/);
            if (match) {
                const title = match[1];
                const linkedArticle = allArticles.find(a => a.title === title);
        
                return linkedArticle ? (
                <Link key={index} to={`/articles/${linkedArticle._id}`} className="article-link-ref">
                    {title}
                </Link>
                ) : (
                <span key={index} style={{ color: 'gray' }}>{title}</span>
                );
            } else {
                return <span key={index}>{part}</span>;
            }
        });
    };
    
    if (error) return <p className="error">{error}</p>;
    if (!article) return <p>Loading...</p>;

    const isOwner = article.owner?.username === loggedInUsername;

    return (
        <div className="article-view">
            <h1>{article.title}</h1>
            <p><strong>Author:</strong> {article.owner.username}</p>
            <p><strong>Category:</strong> {article.category}</p>
            <p><strong>Tags:</strong> {article.tags.join(', ')}</p>
            <p><strong>Visibility:</strong> {article.visibility}</p>
            <hr />
            <p>{renderContentWithLinks(article.content)}</p>
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