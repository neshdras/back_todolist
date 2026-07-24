const express = require('express')
const router = express.Router()
const {profile, getProject} = require('../controllers/profilController')
const authMiddleware = require('../middleware/authMiddleware')

router.get('/', authMiddleware, profile)
router.get('/project', authMiddleware, getProject)

module.exports = router