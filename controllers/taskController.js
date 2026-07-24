const Project = require('../models/projectModel')
const User = require('../models/userModel')
const Task = require('../models/taskModel')
const { default: mongoose } = require('mongoose')
const moment = require('moment')

const addTask = async (req, res) => {
    try {
        const {title, limit, status, idProject, idUser} = req.body
        if(!title || !limit || !idProject || !idUser)
            return res.status(400).json({message: 'Please provide the information requested'})

        const limiteDate = moment.utc(limit)
        
        const existingProject = await Project.findByIdAndUpdate(idProject, 
            {$addToSet: {task: await Task.create({
                title,
                limit: limiteDate,
                status
            })}},
            {returnDocument: 'after'}
        )
        if(!existingProject)
            res.status(404).json({message: "this project doesn't exist"})

        const userObject = new mongoose.Types.ObjectId(idUser)
        if(existingProject.teamMember.includes(userObject) || existingProject.creatorId === idUser )
            res.status(201).json(existingProject)
        else
            res.statut(401).json({message: 'Not authorized to do this'})


    } catch (err) {
        res.status(500).json({message: "Server error during registration of the task", error: err.message})
    }
}



const taskStatus = async (req, res) => {
    const { _id, status} = req.body
    if(!_id  || !status)
        return res.status(400).json({message: 'Please provide the information ask for'})

    if(status != "To do" && status != "Doing" && status != "Done")
        return res.status(400).json({message: "Status is not valid"})

    const existingTask = await Task.findById(_id
    )
    if(!existingTask)
        return res.status(404).json({message: "This task doesn't exist"})

    existingTask.status = status
    const updateTask = await existingTask.save()
    res.status(200).json(updateTask)
}

const addHumanTask = async (req, res) =>{
    const {idTask, idUser} = req.body
    if(!idTask || !idUser)
        return res.status(400).json({message: "Please provide the information ask"})

    const existingUser = await User.findById(idUser)
    if(!existingUser)
        return res.status(404).json({message: "User doesn't exist"})
    const existingTask = await Task .findById(idTask)
    if(!existingTask)
        return res.status(404).json({message: "This task doesn't exist"})

    existingTask.human = idUser
    const updateTask = await existingTask.save()
    res.status(200).json(updateTask)
}

const filterStatus = async (req, res) => {
    const { idProject, status} = req.body
    const taskProject= []
    const taskFiltered= []

    if(!idProject || !status)
        return res.status(400).json({message: "Please provide the information"})

    if(status != "To do" && status != "Doing" && status != "Done")
        return res.status(400).json({message: "Status is not valid"})


    const existingProject = await Project.findById(idProject)
    if(!existingProject)
        return res.status(404).json({message: "Project doesn't exist"})

    const tasks = existingProject.task
    for (const task of tasks) {
        const id = task._id
        
        const haveOne = await Task.find(id)
        if(haveOne)
            taskProject.push(haveOne[0])
    }


    taskProject.forEach(task => {
        if(task.status === status)
            taskFiltered.push(task)
    })
    res.status(200).json({
        status,
        task: taskFiltered
    })
    
}

const filterUser = async (req, res) => {
        const { idProject, idUser} = req.body
    const taskProject= []
    const taskFiltered= []

    if(!idProject || !idUser)
        return res.status(400).json({message: "Please provide the information"})



    const existingProject = await Project.findById(idProject)
    if(!existingProject)
        return res.status(404).json({message: "Project doesn't exist"})

    const existingUser = await User.findById(idUser)
    if(!existingUser)
        return res.status(404).json({message: "User doesn't exist"})

    const collaborators = existingProject.teamMember
    if (!collaborators.includes(idUser))
        return res.status(400).json({message: "This user isn't memeber of the project"})

    const tasks = existingProject.task
    for (const task of tasks) {
        const id = task._id
        
        const haveOne = await Task.find(id)
        if(haveOne)
            taskProject.push(haveOne[0])
    }


    taskProject.forEach(task => {
        if(task.human === idUser)
            taskFiltered.push(task)
    })
    res.status(200).json({
        user: idUser,
        task: taskFiltered
    })
}
module.exports = {addTask, taskStatus, addHumanTask, filterStatus, filterUser}