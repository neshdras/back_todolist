const express = require('express')
const router = express.Router()
const {profile, getProject} = require('../controllers/profilController')

router.get('/', profile)
router.get('/project', getProject)

module.exports = router