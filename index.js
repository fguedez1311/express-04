import express, {request, response } from 'express'
import process from 'node:process'

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
app.get('/get-jobs',(request,response)=>{
    return response.json({
        jobs:[
            {id:1,title:'Frotend Developer'},
            {id:2,title:'Backend Developer'},
            {id:3,title:'Frotend Developer'},

        ]
    })
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