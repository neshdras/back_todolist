
const Project = require('../models/projectModel')
const {mongoose} = require('mongoose')

const profile = async (req, res) => {
    try {
        res.status(200).json({user: req.user})
    } catch (err) {
        res.status(500).json({message: "Server error fetching user profile"})
    }
}
const getProject = async (req, res) => {
    try {
        const userProject = []
        const id = req.body.id
        const objectId = new mongoose.Types.ObjectId(id) 
        
        const projects = await Project.find()

        projects.forEach(project => {
            if(project.teamMember.includes(objectId))
                userProject.push(project)
        });
        
        if(userProject.length >0)
            res.status(200).json({project: userProject})
        else
            res.status(200).json({message: 'You are in none project.'})
            
    } catch (err) {
        res.status(500).json({message: "Server error fetching user's project"})
    }
}

module.exports = {profile, getProject}