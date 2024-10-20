const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const fs = require('fs');
const nodemailer = require('nodemailer');//forgo//
const crypto = require('crypto'); // Import correct du module crypto forgot/
const path = require('path');
//forgot//
const dotenv = require('dotenv');
dotenv.config();
//forgot//
// JWT Secret Key
const JWT_SECRET = 'your_jwt_secret_key';

// User Registration
exports.register = async (req, res) => {
    const { username, password, lastname, number, email,status, education, adress  } = req.body;
    const profileImage = req.file;

    try {
        // Hash Password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create New User
        const newUser = new User({
            username: username,
            password: hashedPassword,
            lastname: lastname,
            number: number,
            email: email,
            status: status,
            education: education,
            adress: adress,
            profileImage: profileImage ? profileImage.filename : null
        });

        await newUser.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Registration failed' });
    }
};

// User Login
exports.login = async (req, res) => {
    const { username, password } = req.body;

    try {
        // Check if user exists
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({ error: 'Invalid username or password' });
        }

        // Check if password is correct
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: 'Invalid username or password' });
        }

        // Generate JWT
        const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({ token, userId: user._id, username: user.username, profileImage: user.profileImage });
    } catch (error) {
        res.status(500).json({ error: 'Login failed' });
    }
};
// Récupérer le profil de l'utilisateur
exports.getProfile = async (req, res) => {
    try {
        console.log('Fetching profile for userId:', req.user.userId); // Log
        const user = await User.findById(req.user.userId).select('-password');
          if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        console.error('Error fetching user profile:', error); // Log
        res.status(500).json({ error: 'Error fetching user profile' });
    }
};

exports.forgotPassword = async (req, res) => {
    const { email } = req.body;

    try {
        console.log('Forgot Password Request:', email);
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ error: 'Utilisateur non trouvé' });
        }

        // Générer un token de réinitialisation
        const resetToken = crypto.randomBytes(20).toString('hex');
        console.log('Generated Reset Token:', resetToken);
        // Hash le token avant de le stocker dans la base de données
        const hashedToken = crypto.createHash('sha256').update(resetToken).digest('hex');

        // Définir le token et l'expiration dans l'utilisateur
        user.resetPasswordToken = hashedToken;
        user.resetPasswordExpires = Date.now() + 3600000; // 1 heure
        await user.save();

        // Configuration de Nodemailer
        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: process.env.GMAIL_USER,
                pass: process.env.GMAIL_PASS,
            },
        });

        const resetURL = `http://localhost:3000/reset-password/${resetToken}`;

        const mailOptions = {
            to: user.email,
            from: 'foued.belajouza@gmail.com',
            subject: 'Réinitialisation de votre mot de passe',
            text: `Vous recevez cet email parce que vous (ou quelqu'un d'autre) avez demandé la réinitialisation du mot de passe pour votre compte.\n\n
Cliquez sur le lien suivant pour réinitialiser votre mot de passe:\n\n
${resetURL}\n\n
Si vous n'avez pas fait cette demande, veuillez ignorer cet email et votre mot de passe restera inchangé.\n`,
        };

        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: 'Email de réinitialisation envoyé.' });
    } catch (error) {
        console.error('Forgot Password error:', error);
        res.status(500).json({ error: 'Erreur serveur.' });
    }
};

// Reset Password
exports.resetPassword = async (req, res) => {
    const { token } = req.params;
    const { newPassword } = req.body;

    try {
        // Hash le token pour le comparer avec celui stocké dans la base de données
        const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

        // Trouver l'utilisateur avec le token de réinitialisation valide
        const user = await User.findOne({
            resetPasswordToken: hashedToken,
            resetPasswordExpires: { $gt: Date.now() }, // Vérifie si le token est encore valide
        });

        if (!user) {
            return res.status(400).json({ error: 'Le token est invalide ou a expiré.' });
        }

        // Hash le nouveau mot de passe
        user.password = await bcrypt.hash(newPassword, 10);

        // Mettre à jour le mot de passe et supprimer le token
        
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;
        await user.save();

        res.status(200).json({ message: 'Mot de passe réinitialisé avec succès.' });
    } catch (error) {
        console.error('Reset Password error:', error);
        res.status(500).json({ error: 'Erreur serveur.' });
    }
};
