const Project = require('../models/projectModel')
const User = require('../models/userModel')

const newProject = async (req, res) => {
    try {

        const {title, description, creatorId} = req.body

        if(!title || !description || !creatorId)
            return res.status(400).json({message: 'Please provide the informations of your project.'})
    
        const existingProject = await Project.findOne({title})
        if(existingProject)
            return res.status(400).json({message: 'This project already exist'})

        const project = await Project.create({
            title,
            description,
            creatorId
        })
        res.status(201).json({
            message: 'Project create succesfully',
            project: {
                id: project._id,
                title: project.title,
                description: project.description,
                creatorId: project.creatorId,
                task: []
            }
        })
    } catch (err) {
        res.status(500).json({message: "Server error during registration of the project", error: err.message})
    }
}
const addCollaborateur = async (req, res) => {
    try {
        const {email, _id, creatorId} = req.body
        if (!email || !_id || !creatorId)
            return res.status(400).json({message: 'Please provide the information requested'})

        const existingUser = await User.findOne({email})
        if(!existingUser)
            return res.status(404).json({message: "The user doesn't exist"})
        
        const existingProject = await Project.findByIdAndUpdate(_id, 
            {$addToSet: {teamMember: existingUser._id}},
            {returnDocument: 'after'}
        )
        if(!existingProject)
            return res.status(404).json({message: "The project doesn't exist"})
        
        if(existingProject.creatorId === creatorId){
            res.json(existingProject)
        } else{
            res.status(401).json({message: 'Not authorized to do this'})
        }
    } catch (err) {
        res.status(500).json({message: "Server error during registration of the project", error: err.message})
    }
}
module.exports = {newProject, addCollaborateur}