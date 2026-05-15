import express from 'express'
import {corsMiddleware} from './middlewares/cors.js'
import cors from 'cors'
import {jobsRouter} from './routes/jobs.js'
import {DEFAULTS} from './config.js'

const PORT=process.env.PORT ?? DEFAULTS.PORT

const  app=express()
app.use(express.json())
// app.use(cors())
app.use(corsMiddleware)
app.use('/jobs',jobsRouter)
app.listen(PORT,()=>{
    console.log(`Servidor levantado en http://localhost:${PORT}`)
})
export default app