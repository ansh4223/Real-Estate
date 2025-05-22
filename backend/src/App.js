const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('./models/User');
const Property = require('./models/Property');
const authenticateToken = require('./middleware/auth');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// User Registration
app.post('/api/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ name, email, password: hashedPassword });
        await user.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error registering user', error });
    }
});

// User Login
app.post('/api/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET || 'secretkey', { expiresIn: '1h' });
        res.json({ message: 'Login successful', token });
    } catch (error) {
        res.status(500).json({ message: 'Error logging in', error });
    }
});

// Add Property (Protected)
app.post('/api/properties', authenticateToken, async (req, res) => {
    try {
        const property = new Property(req.body);
        await property.save();
        res.status(201).json({ message: 'Property added successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error adding property', error });
    }
});

// Get Properties (Protected)
app.get('/api/properties', authenticateToken, async (req, res) => {
    try {
        const properties = await Property.find();
        res.json(properties);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching properties', error });
    }
});

// Update Property (Protected)
app.put('/api/properties/:id', authenticateToken, async (req, res) => {
    try {
        const updatedProperty = await Property.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedProperty);
    } catch (error) {
        res.status(500).json({ message: 'Error updating property', error });
    }
});

module.exports = app;
