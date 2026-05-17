import jobs from '../jobs.json' with { type: 'json' }

export class JobModel{
    static async getAll({text,title,level,limit=10,technology,offset=0}){
        
        let filteredJobs=jobs

        if (text){
            const searchTerm=text.toLowerCase()
            filteredJobs=filteredJobs.filter(job=>job.titulo.toLowerCase().includes(searchTerm) || job.descripcion.toLowerCase().includes(searchTerm)
            )
        
        }
    

    // Si no hay filtro, devolvemos todos los empleos
        const limitNumber=Number(limit)
        const offsetNumber=Number(offset)
        const paginatedJobs=filteredJobs.slice(offsetNumber,offsetNumber+limitNumber)
        return paginatedJobs
    }
    static async create({titulo,empresa,ubicacion,descripcion,data}){
         const newJob={
            id: crypto.randomUUID(),
            titulo,
            empresa,
            ubicacion,
            descripcion,
            data
          }
        jobs.push(newJob)
        return  newJob
    }
    static async getById(id){
         const job=jobs.find(job=>job.id===id)
         return job
    }
}