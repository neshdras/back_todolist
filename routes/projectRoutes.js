const express = require('express')
const router = express.Router()
const {newProject, addCollaborateur, addTask, taskStatus} = require('../controllers/projectController')
const authMiddleware = require('../middleware/authMiddleware')

router.post('/new', authMiddleware, newProject)
router.patch('/collaborateur', authMiddleware, addCollaborateur)

module.exports = router