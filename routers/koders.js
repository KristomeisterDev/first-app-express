const express = require('express')
const fs = require('fs')
const router = express.Router()// aqui se crea le instancia del router

async function getKoders() {
    const content = await fs.promises.readFile('./kodemia.json')
    const koders = JSON.parse(content)
    return koders
}
//GET /koders/
//GET /koders/:id
router.get('/', async (request, response) => {
    console.log('query params: ', request.query)
    const count = request.query.count
    console.log('count: ', count)
    const json = await getKoders()
    let kodersData = json.koders

    if(count) {
        kodersData = kodersData.slice(0, parseInt(count))
    }
    response.json({
        koders: kodersData
    })
})

router.get ('/:id', async (request,response) => { 
    const idKoder  = request.params.id   
    const json = await getKoders()
    const koderFound = json.koders.find((koder) => koder.id === parseInt(idKoder)) /
    console.log(koderFound)
    
    if (!koderFound) {
        response.status(404) 
        response.json({
            success: false,
            message: 'koder not found' 
        })
        return 
    }
    response.json({
        success: true,
        koder: koderFound
    })
    })
    
    router.delete('/:id', async (request,response) => {
        const idKoder = request.params.id 
        const json = await getKoders() 
        const kodersFiltered = json.koders.filter((koder) => koder.id !== parseInt(idKoder)) 
        json.koders = kodersFiltered 
    
        await fs.promises.writeFile('./kodemia.json', JSON.stringify(json, null, 2), 'utf-8') 
        response.json({
            success: true,
            message: 'koder deleted sucessfully'
        })
    })
    
    router.post('/', async (request,response) => {
        const newKoder = request.body
        console.log(newKoder)
        const json = await getKoders()
        json.koders.push(newKoder)
        console.log(json)
    
        await fs.promises.writeFile('./kodemia.json', JSON.stringify(json, null, 2), 'utf-8')
        response.json({
            sucess: true,
            message: 'se creo el koder'
        })
    })
    
    router.patch('/:id', async (request, response) => {
        console.log('id: ', request.params.id)
        const idKoder = request.params.id
        const name = request.body.name
        const json = await getKoders()
        console.log('json: ', json)
        
        const newKoders = json.koders.map((koder, index) => {
            if(koder.id === parseInt(koder)){
                koder.name = name
            }
            return koder
        })
        console.log('newKoders')
        console.log(newKoders)
    
        jsonKoders = newKoders
    
        await fs.promises.writeFile('./kodemia.json', JSON.stringify(json, null, 2), 'utf-8')
        response.json({
            success: true,
        })    
    })

//exportar
module.exports = router

//tarea generar un router a mentores