const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');

const registerUser = async (req, res) => {
    try {
        const {name, email, password, role } = req.body;
        const hashPassword = await bcrypt.hash(password, 10);
        const newUser = userModel({name, email, password: hashPassword, role})
        await newUser.save()
        res.status(201).json({status: 'success', message: 'user created successfully', data: newUser})

    } catch (err) {
        res.status(500).json({status: 'failed', message: err.message})
    }
}

const loginUser = async (req, res) => {
    try {
        const {email, password} = req.body;

        const user = await userModel.findOne({email});

        if(!user) return res.status(404).json({ status: 'failed', message: "user not found" })

        const isValid = await bcrypt.compare(password, user.password)

        if(!isValid) return res.status(404).json({status: 'failed', message: "error password"})
        const token = jwt.sign({userId : user._id}, process.env.JWT_SECRET, {expiresIn: '1h'})
        
        res.status(400).json({status: 'success', message: 'login successful', data: user, token})
        
        
    } catch (error) {
        res.status(500).json({status: "failed", message: error.message})
    }
}

module.exports = {registerUser, loginUser};