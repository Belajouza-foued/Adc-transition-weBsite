import React, { useState } from 'react';
import axios from 'axios';

const ResetPassword = ({ token }) => {
    const [newPassword, setNewPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await axios.post(`/api/auth/reset-password/${token}`, { newPassword }); // Retirez `response`
            setSuccess('Mot de passe réinitialisé avec succès.');
            setError('');
        } catch (err) {
            setError('Erreur lors de la réinitialisation du mot de passe.');
            console.error('Erreur:', err.response.data);
        }
    };

    return (
        <div>
            <h2>Réinitialiser le mot de passe</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Nouveau mot de passe:</label>
                    <input
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Réinitialiser</button>
            </form>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {success && <p style={{ color: 'green' }}>{success}</p>}
        </div>
    );
};

export default ResetPassword;
