const jwt = require('jsonwebtoken')
const User = require('../models/userModel')
const JWT_SECRET = process.env.JWT_SECRET
const JWT_EXPIRE_IN = '24h'

const generateToken = (id) => {
    return jwt.sign({id}, JWT_SECRET, {
        expiresIn: JWT_EXPIRE_IN
    })
}

const register = async (req, res) => {
    try {
        const {name, email, password, role} = req.body

        if(!name || !email || !password)
            return res.status(400).json({message: 'Please provide name, email and password'})

        const existingUser = await User.findOne({email})
        if(existingUser)
            return res.status(400).json({message: 'Email already use'})

        const user = await User.create({
            name,
            email,
            password,
            role: role || 'user',
            project: []
        })
        const token = generateToken(user._id)
        res.status(201).json({
            message: 'User registered succesfully',
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
            }
        })
    } catch (err) {
        res.status(500).json({message: "Server error during registration", error: err.message})
    }
}

const login = async (req, res) => {
    try {
        const {email, password} = req.body

        if(!email || !password)
            return res.status(400).json({message: 'Please provide email and password'})

        const user = await User.findOne({email}).select('+password')
        if(!user)
            return res.stauts(400).json({message: 'Invalid credentials'})

        const isMatch = await user.comparePassword(password)
        if(!isMatch)
            return res.status(400).json({message: 'Invalid credentials'})

        const token = generateToken(user._id)

        res.status(200).json({
            message: 'Login succesfully',
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        })
    } catch (err) {
        res.status(500).json({message: "Server error during login", error: err.message})
    }
}
module.exports = { register, login }