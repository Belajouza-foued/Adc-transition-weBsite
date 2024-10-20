// src/components/ForgotPassword.js

import React, { useState } from 'react';
import axios from 'axios';
 // Créez ce fichier pour styliser le composant si nécessaire

function ForgotPassword() {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setError('');

        try {
            const response = await axios.post('http://localhost:5000/api/auth/forgot-password', { email });
            setMessage(response.data.message);
        } catch (err) {
            console.error('AxiosError:', err);
            setError(err.response?.data?.error || 'Erreur lors de l\'envoi de l\'email.');
        }
    };

    return (
        <div className="forgot-password-container">
            <h2>Mot de passe oublié</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="form-control"
                        placeholder="Entrez votre email"
                    />
                </div>
                <button type="submit" className="btn btn-primary">Envoyer</button>
            </form>
            {message && <p className="text-success mt-3">{message}</p>}
            {error && <p className="text-danger mt-3">{error}</p>}
        </div>
    );
}

export default ForgotPassword;
