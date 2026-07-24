const express = require("express")
const router = express.Router()
const { addTask, taskStatus, addHumanTask, filterStatus, filterUser } = require('../controllers/taskController')
const authMiddleware = require("../middleware/authMiddleware")

router.post('/', authMiddleware, addTask)
router.patch('/human', authMiddleware, addHumanTask)
router.patch('/status', authMiddleware, taskStatus)
router.get('/filter/status',authMiddleware, filterStatus)
router.get('/filter/user', authMiddleware, filterUser)
module.exports = router