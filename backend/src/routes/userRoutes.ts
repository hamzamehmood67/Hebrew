const express =   require('express');
const {
    signup,
    login,
    getProfile,
    updateProfile,
    deleteUserProfile,
} = require('../controllers/userController')
const authenticate = require('../middleware/auth');

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.get('/profile', authenticate, getProfile);
router.put('/profile', authenticate, updateProfile);
router.delete('/delete', authenticate, deleteUserProfile);

export default router;
