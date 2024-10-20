const express = require('express');
const multer = require('multer');
const { register, login, getProfile,forgotPassword,resetPassword } = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware'); // Import du middleware d'authentification



// Multer Configuration for File Uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});
const upload = multer({ storage });

const router = express.Router();

// Register Route with Image Upload
router.post('/register', upload.single('profileImage'), register);

// Login Route
router.post('/login', login);
router.get('/profile', authMiddleware, getProfile); // Utiliser GET et middleware d'authentification

// Forgot Password Route
router.post('/forgot-password', forgotPassword);
// Reset Password Route
router.post('/reset-password/:token', resetPassword);

module.exports = router;
