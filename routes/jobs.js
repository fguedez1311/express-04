import {Router} from 'express'
import { jobController } from '../controllers/jobs.js'



export const jobsRouter=Router()
// Crud: Create, Read, Update,Delete
 
jobsRouter.get('/',jobController.getAll)
jobsRouter.get('/:id',jobController.getId)

jobsRouter.post('/',jobController.create)
// Reemplazar un recurso completo
jobsRouter.put('/:id',jobController.update)

// Actualizar parcialmente un recurso
jobsRouter.patch('/:id',jobController.partialUpdate)

// Borrar un recurso
jobsRouter.delete('/:id',jobController.delete)

