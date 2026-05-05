import express, { response } from 'express'
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
const previousHomeMiddleware=(request,response,next)=>{
    console.log('Ejecutando el middleware previo a la ruta /')
    next()
}
app.get('/',previousHomeMiddleware,(request,response)=>{
    return response.send('<h1>Hello Word!</h1>')
})
app.get('/health',(request,response)=>{
    return response.json({
        status:'ok',
        uptime: Math.floor(process.uptime()), // Segundos ndeados
        timestamp: Date.now(),
    })
})

app.listen(PORT,()=>{
    console.log(`Servidor levantado en http://localhost:${PORT}`)
})