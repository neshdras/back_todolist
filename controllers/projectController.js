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
        const {email, _id} = req.body
        if (!email || !_id)
            return res.status(400).json({message: 'Please provide the information requested'})

        const existingUser = await User.findOne({email})
        if(!existingUser)
            return res.status(404).json({message: "The user doesn't exist"})
        
        const existingProject = await Project.findByIdAndUpdate(_id, 
            {$addToSet: {teamMember: existingUser._id}},
            {new: true}
        )
        if(!existingProject)
            return res.status(404).json({message: "The project doesn't exist"})
        
        res.json(existingProject)
        // const projectMember = [...existingProject.teamMember]
        
        // const idUser = await existingUser._id.toHexString()
        
        // projectMember.push(idUser)
        // console.log(projectMember)
        // const updateProject= await existingProject.updateOne(
        //     {_id},
        //     {$set: }
        // )
        // const updateProject= await existingProject.save(projectMember)
        // res.json(updateProject)
    } catch (err) {
        res.status(500).json({message: "Server error during registration of the project", error: err.message})
    }
}
module.exports = {newProject, addCollaborateur}