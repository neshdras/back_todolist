const mongoose = require('mongoose')

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
            type: Array,
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