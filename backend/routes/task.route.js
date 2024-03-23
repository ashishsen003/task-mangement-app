import express from 'express'
import { addtask, deletetask, edittask, task, tasks } from '../controllers/task.controller.js'
import { authUser } from '../middlewares/task.middleware.js'

const router = express.Router()

router.post('/create-task', authUser, addtask)
router.get('/view-all-tasks', authUser, tasks)
router.get('/view-task/:taskId', authUser, task)
router.get('/delete-task/:taskId', authUser, deletetask)
router.get('/edit-task/:taskId', authUser, edittask)

export default router






