import React, { useState } from 'react';
import axios from 'axios';
import './AuthForm.css';

export default function Register() {
    const [form, setForm] = useState({ username: '', email: '', password: '' });
    const [message, setMessage] = useState('');

    const handleChange = e => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async e => {
        e.preventDefault();
        try {
        const res = await axios.post('http://localhost:5000/api/auth/register', form);
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('username', res.data.username);
        window.location.href = '/dashboard';
        } catch (err) {
        setMessage(err.response?.data?.message || 'Registration failed');
        }
    };

    return (
        <div className="auth-form-container">
        <form className="auth-form" onSubmit={handleSubmit}>
            <img src="/assets/Root-Realms Logo.png" alt="Root Realms Logo" className="auth-logo" />
            <h2>Register</h2>
            <input name="username" placeholder="Username" onChange={handleChange} required />
            <input name="email" type="email" placeholder="Email" onChange={handleChange} required />
            <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
            <button type="submit">Register</button>
            {message && <p className="error-message">{message}</p>}
        </form>
        </div>
    );
}
