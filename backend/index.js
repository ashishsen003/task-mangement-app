

import express from 'express'
import authRoute from './routes/auth.route.js'
import taskRoute from './routes/task.route.js'
import { connection } from './db.js'
import cors from 'cors'

const app = express()
app.use(express.json())
app.use(cors());

app.use('/auth', authRoute)
app.use('/user', taskRoute)


const PORT = process.env.PORT
app.listen(PORT, async()=>{
    try {
        await connection
        console.log(`Server is running on port ${PORT}`);
    } catch (error) {
        console.log(error.message);
    }
})

