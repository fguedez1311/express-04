import express from 'express'
import process from 'node:process'
import cors from 'cors'
import jobs from './jobs.json' with {type:'json'}
import {DEFAULTS} from './config.js'
// Devuelve los segundos que el proceso lleva activo
const uptime = process.uptime()

const PORT=process.env.PORT ?? DEFAULTS.PORT

const  app=express()
app.use(express.json())
const ACCEPTED_ORIGINS=[
    'http://localhost:3000',
    'https://midu.dev',
    'http://localhost:5173'
]

app.use(
    cors(
        {
            origin:(origin,callback)=>{
                if (ACCEPTED_ORIGINS.includes(origin)){
                   return callback(null,true)
                }
                return callback(new Error('Origen no permitido'))
            }
        }
    )
)

app.use('/',(req,res,next)=>{
    const timeString=new Date().toLocaleDateString()
    console.log(`[${timeString} ${req.method} ${req.url}]`)
    next()
})

app.get('/',(req,res)=>{
    return res.send('<h1>Hello Word!</h1>')
})
app.get('/health',(req,res)=>{
    return res.json({
        status:'ok',
        uptime: Math.floor(process.uptime()), // Segundos ndeados
        timestamp: Date.now(),
    })
})

// Crud: Create, Read, Update,Delete
 
app.get('/jobs',async(req,res)=>{
    // const {default:jobs}=await import('./jobs.json',{with:{type:'json'}})
    res.header('Access-Control-Allow-Origin','http://localhost:5173')
    const {text,title,level,limit=DEFAULTS.LIMIT_PAGINATION,technology,offset=DEFAULTS.LIMIT_OFFSET}=req.query
    let filteredJobs=jobs

    if (text){
        const searchTerm=text.toLocaleLowerCase()
        filteredJobs=filteredJobs.filter(job=>job.titulo.toLowerCase().includes(searchTerm) || job.descripcion.toLowerCase().includes(searchTerm)
        )
       
    }
    

   // Si no hay filtro, devolvemos todos los empleos
     const limitNumber=Number(limit)
     const offsetNumber=Number(offset)
     const paginatedJobs=filteredJobs.slice(offsetNumber,offsetNumber+limitNumber)
     return res.json({data:paginatedJobs,total:filteredJobs.length,limit:limitNumber,offset:offsetNumber})




    
})
app.get('/job/:id',(req,res)=>{
    const {id}=req.params
    console.log(id)
    
   const job=jobs.find(job=>job.id===id)
   if(!job){
    return res.status(404).json({error:'Job not found'})
   }
   return res.json(job)

})

app.post('/jobs',(req,res)=>{
    const {titulo,empresa,ubicacion,descripcion,data}=req.body 
    const newJob={
        id: crypto.randomUUID(),
        titulo,
        empresa,
        ubicacion,
        descripcion,
        data
    }
    jobs.push(newJob)
    return res.status(201).json(newJob)

})

app.listen(PORT,()=>{
    console.log(`Servidor levantado en http://localhost:${PORT}`)
})