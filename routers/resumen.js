const express = require('express')//importamos le modulo de express
const fs = require('fs')//importramos el modulo del filesystem
const server = express()//nos regresa un servidor
//middleware
server.use(express.json())// recibir json en nuestros request

async function getKoders() {
    const content = await fs.promises.readFile('./kodemia.json')//fs para leer el contenido
    const json = JSON.parse(content)//convertir de string a un objeto valido
    return json //salida rapida a json
}
//declarando endpoint GET
server.get('/koders', async (request, response) => {
    //fs.readFileSync() // sincrona
    //fs.promises.readFile() // promesa (asincrona)
    // const content = fs.readFileSync('./koders.json,'utf-8')
    console.log('query params: ', request.query)
    const count = request.query.count
    console.log('count: ', count)
    const json = await getKoders()
    let kodersData = json.koders

    if(count) {
        kodersData = kodersData.slice(0, parseInt(count))// slice nos regresa una parte cortada del arreglo
    }

    response.json({
        koders: kodersData
    })
})

//GET /koders/2
server.get ('/koders/:id', async (request,response) => { //pasamos los path parameters /:id del archivo
const idKoder  = request.params.id   //declaramos el idKoder del id dinamico para acceder al valor con los path parameters
const content = await fs.promises.readFile('./kodemia.json')//declaramos el contenido para leer el archivo json = 'kodemia.json'con un readFile del fs y declaramos la funcion asincrona si usamos una promesa en el fs
const json = JSON.parse(content)//convertimos el content a un objeto valido en json
//const koderFound = json.koders.filter((koder,index) => koder.id === parseInt(idKoder) )   //utilizamos un filter para encontrar al idKoder en arreglo koders del json y regresa un arreglo
const koderFound = json.koders.find((koder) => koder.id === parseInt(idKoder)) //utilizamos un find para que encontrar y regrese el objeto y no un arreglo
console.log(koderFound)
// se hace validación para cuando find no encuentre el objeto y nos regrese undefined
if (!koderFound) {
    response.status(404) // se manda el status 404 para indicar que no se encontro
    response.json({
        success: false,
        message: 'koder not found' 
    })
    return //salida rapida por si no lo encontro
}
// y si lo encuentra mandamos el koderFound
response.json({
    koder: koderFound
})
})

server.delete('/koders/:id', async (request,response) => {
    const idKoder = request.params.id //declaramos idKoder
    const content = await fs.promises.readFile('./kodemia.json') //declaramos contenido a leer
    const json = JSON.parse(content) //pasamos a objeto valido

    const kodersFiltered = json.koders.filter((koder) => koder.id !== parseInt(idKoder)) // utilizamos un filter para filtrar a los koder menos al que coincida para borrarlo
    json.koders = kodersFiltered //igualamos kodersfiltered a json.koders para que sea el nuevo arreglo

    await fs.promises.writeFile('./kodemia.json', JSON.stringify(json, null, 2), 'utf-8') // utilizamos escritura del fs y pasamos el objeto json a un string

    response.json({
        success: true,
        message: 'koder deleted sucessfully'
    })
})

server.post('/koders', async (request,response) => {
    const newKoder = request.body
    console.log(newKoder)
    const content = await fs.promises.readFile('./kodemia.json')
    const jsonKoders = JSON.parse(content)
    jsonKoders.koders.push(newKoder)

    console.log(jsonKoders)

    await fs.promises.writeFile('./kodemia.json', JSON.stringify(jsonKoders, null, 2), 'utf-8')

    response.json({
        sucess: true,
        message: 'se creo el koder'
    })
})

server.patch('/koders/:id', async (request, response) => {
    console.log('id: ', request.params.id)
    const idKoder = request.param.id
    const name = request.body.name
    const content = await fs.promises.readFile('./kodemia.json')
    const json = JSON.parse(content)
    console.log('json: ', json)
    //forEach
    //map
    //filter
    //reduce
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