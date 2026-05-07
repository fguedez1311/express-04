import express, {request, response } from 'express'
import process from 'node:process'
import jobs from './jobs.json' with {type:'json'}
import {DEFAULTS} from './config.js'
// Devuelve los segundos que el proceso lleva activo
const uptime = process.uptime()

const PORT=process.env.PORT ?? DEFAULTS.PORT

const  app=express()
app.use('/',(request,response,next)=>{
    const timeString=new Date().toLocaleDateString()
    console.log(`[${timeString} ${request.method} ${request.url}]`)
    next()
})

app.get('/',(request,response)=>{
    return response.send('<h1>Hello Word!</h1>')
})
app.get('/health',(request,response)=>{
    return response.json({
        status:'ok',
        uptime: Math.floor(process.uptime()), // Segundos ndeados
        timestamp: Date.now(),
    })
})
app.get('/get-jobs',async(request,response)=>{
    // const {default:jobs}=await import('./jobs.json',{with:{type:'json'}})
    const {text,title,level,limit=DEFAULTS.LIMIT_PAGINATION,technology,offset=DEFAULTS.LIMIT_OFFSET}=request.query
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
     return response.json(paginatedJobs)




    
})
app.get('/get-single-job/:id',(request,response)=>{
    const {id}=request.params
    const idNumber=Number(id)
    return response.json({
        job:{id:idNumber,title:`Job with id ${id}`}
    })
})
app.get('/a{b}cd',(request,response)=>{
    
    return response.send('abcd o acd')
})
app.get('/bb*bb',(request,response)=>{
    
    return response.send('bb*bb')
})

app.listen(PORT,()=>{
    console.log(`Servidor levantado en http://localhost:${PORT}`)
})