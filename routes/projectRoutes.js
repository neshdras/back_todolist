const express = require('express')
const router = express.Router()
const {newProject, addCollaborateur} = require('../controllers/projectController')

router.post('/new', newProject)
router.patch('/collaborateur', addCollaborateur)

module.exports = router