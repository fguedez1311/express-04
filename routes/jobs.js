import {Router} from 'express'
import { JobController } from '../controllers/jobs.js'



export const jobsRouter=Router()

// Crud: Create, Read, Update,Delete
 
jobsRouter.get('/',JobController.getAll)
jobsRouter.get('/:id',JobController.getId)
jobsRouter.post('/',JobController.create)
// Reemplazar un recurso completo
jobsRouter.put('/:id',JobController.update)

// Actualizar parcialmente un recurso
jobsRouter.patch('/:id',JobController.partialUpdate)

// Borrar un recurso
jobsRouter.delete('/:id',JobController.delete)
