const User = require('../models/userModel');
const Article = require('../models/articleModel');

// POST /api/users
const createUser = async (req, res) => {
    try {
        const { name, email, age, role, bio, phone } = req.body;
        if (!name || !email) {
            return res.status(400).json({ message: 'Name and email are required' });
        }
        // uplicate email
        const exists = await User.findOne({ email });
        if (exists) {
            return res.status(409).json({ message: 'Email already in use' });
        }
        const user = await User.create({ name, email, age, role, bio, phone });
        res.status(201).json(user);
    } catch (err) {
        if (err.name === 'ValidationError') {
            return res.status(400).json({ message: err.message });
        }
        if (err.code === 11000) {
            return res.status(409).json({ message: 'Email already in use' });
        }
        res.status(500).json({ message: err.message });
    }
};

// GET /api/users
const getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// GET /api/users/:id) with CastError handling 
const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (err) {
        if (err.name === 'CastError') {
            return res.status(400).json({ message: 'Invalid resource identifier (ObjectId expected)' });
        }
        res.status(500).json({ message: err.message });
    }
};

//  Secure user deletion with Referential Integrity Guard 
const deleteUser = async (req, res) => {
    try {
        const userId = req.params.id;

        // Verify user exists first
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // check for dependent articles authored by this user
        const dependentArticle = await Article.findOne({ author: userId });
        if (dependentArticle) {
            return res.status(400).json({ message: 'Impossible to delete an author with published articles' });
        }

        await User.findByIdAndDelete(userId);
        res.status(200).json({ message: 'User deleted successfully', id: userId });
    } catch (err) {
        if (err.name === 'CastError') {
            return res.status(400).json({ message: 'Invalid resource identifier (ObjectId expected)' });
        }
        res.status(500).json({ message: err.message });
    }
};

module.exports = {
    createUser,
    getUsers,
    getAllUsers: getUsers, 
    getUserById,
    deleteUser
};