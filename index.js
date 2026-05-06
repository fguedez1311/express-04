import express, {request, response } from 'express'
import process from 'node:process'
import jobs from './jobs.json' with {type:'json'}
// Devuelve los segundos que el proceso lleva activo
const uptime = process.uptime()

const PORT=process.env.PORT ?? 1234

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
    return response.json(jobs)
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