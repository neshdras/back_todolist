const mongoose = require('mongoose')
const Task = require('./taskModel')

const projectSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, 'The title is required'],
            unique: true
        },
        description: {
            type: String,
            required: [true, 'Explain your project !'],
        },
        creatorId: {
            type: String,
            required: true
        },
        task: {
            type: [mongoose.ObjectID],
            ref: 'Task',
            required: false,
        },
        teamMember:{
            type: Array,
            required: false
        }
    },
    {
        timestamps: true,
    }
)

module.exports = mongoose.model('Project', projectSchema)