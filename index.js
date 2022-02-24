const { response } = require("express");
const express = require("express");
//importamos modulo de kodersRouter y MentorsRouter
const kodersRouter = require('./routers/koders')
const mentorsRouter = require('./routers/mentors')
const server = express(); //nos regresa un servidor
const port = 8080;
const fs = require("fs");
//middleware
server.use(express.json()); // recibir nuestros request
//montamos server de koders y mentors
server.use('/koders', kodersRouter)//aqui indicamos monta en la ruta koders el el router kodersRouter
server.use('/mentors', mentorsRouter)

server.get("/hola", (request, response) => {
  response.write("GET/hola");
  response.end();
});

server.post("/hola", (request, response) => {
  response.write("POST/hola");
  response.end();
});

server.get("/koders", (request, response) => {
  /*response.writeHead(400, { "Content Type": "application/json" });
  const json = {
    message: "ok",
  };
  const jsonString = JSON.stringify(json);
  response.write(jsonString);
  response.end();*/

  //express
  response.status(201);
  response.json({
    message: "koders",
  });
});

server.post("/koders", (request, response) => {
  const body = request.body;
  console.log("body: ", body);
  console.log("body-name: ", body.name);

  response.json({
    message: "oki",
  });
});

server.listen(8080, () => {
  console.log("Server running on port: 8080");
});

//Ejercicio 1:
/*
GET/koders -> aqui estan todos los koders
POST/koders -> aqui puedes crear koders
PUT/koders -> aqui puedes sustituir a koders
*/

server.get("/koders", (request, response) => {
  response.write("GET/aqui estan todos los koders");
  response.end();
});

server.post("/koders", (request, response) => {
  response.write("POST/aqui puedes crear koders");
  response.end();
});

server.put("/koders", (request, response) => {
  response.write("PUT/aqui puedes sustituir a koders");
  response.end();
});

server.listen(8081, () => {
  console.log("Server running on port: 8081");
});

/*
Endpoint: 
es el conjunto de un metodo y una ruta, es el ultimo punto donde llega nuestra petición
GET/koders
GET/koders/id
POST/koders
PUT/koders
PATCH/koders
*/

/*
practica: fs + express

GET/koders -> regresa un json con una lista de koders
->la lista de koders vendra de un archivo.json
leer al archivo koders.json con fs

De JSON a String JSON.Stringify({""})
De String a JSON JSON.parse(string)

POST/koders 
*/

/*server.get("/koders", async (request, response) => {
  //fs.readFileSync() //sincrona
  //const content = fs.readFileSync('./koders.json', 'utf-8')
  //fs.promises.readFile() // promesa

 const content = await fs.promises.readFile('/koders.json')

    console.log(content) // string
    const json = JSON.parse(content) //convertir de string a un objeto valido
    console.log('---json---')
    console.log(json)
    response.json(json)
 
});

server.post ('/koders', async (request, response) => {
    const newKoder = request.body //recibimos información en el body
    console.log(newKoder)
    const content = await fs.promises.readFile('./koders.json')
    const jsonKoders = JSON.parse(content)
    jsonKoders.koders.push(newKoder)

    console.log(jsonKoders)

    await fs.promise.writeFile('./koders.json', JSON.stringify(jsonKoders, null, 2), 'utf-8')

    response.json({
        success: true,
        message: 'Se creo el koder'
    })
})

//update
//path parameters
//sintaxis universal
//PATCH /koders/1
//PATCH /koders/10
//PATCH /koders/100
//PATCH /recurso/identificador
//PATCH /koders/:id

server.patch('/koders/:id', async (request, response) => {
    console.log('id: ',request.params.id)//donde se almacenan los path parameters
    const idKoder = request.params.id // que vamos a actualizar
    const name = request.body.name //debemos indicar el dato que vamos actualizar
    const content = await fs.promises.readFile('./koders.json')
    const json = JSON.parse(content)
    console.log('json: ', json)
    //forEach 
    //filter
    //reduce
    // usamos map
    const newKoders = json.koders.map((koder, index) => {
        if (koder.id === parseInt(idKoder)) {
            koder.name = name
        }
        return koder 
    })
    console.log('newKoders')
    console.log(newKoders)

    json.koders = newKoders

    await fs.promises.writeFile('./koders.json', JSON.stringify(json, null, 2), 'utf-8')

    response.json({
        succes: true,
    })
})

server.listen(8082, () => {
  console.log("Server running on port: 8082");
});

//////

/*un endpoint para borrar un koder

DELETE /koders/:id
GET /koders/:id

*/

//server.get (9'')

/*server.get('/koders/:id',async(request,response) => {
  const idKoder = request.params.id

  const content = await fs.promises.readFile('./koders.json')
  const json = JSON.parse(content)

  //const koderFound = json.koders.filter((koder,index) => koder.id === parseInt(idKoder))
  const koderFound = json.koders.find((koder)=> koder.id === parseInt(idKoder))
  console.log(koderFound)

  if(!koderFound){
    response.status(404)
    response.json({
      success: false,
      message: 'koder not found'
    })
    return
  }
  response.json({
    sucess: true,
    koder: koderFound
  })
})

server.delete*/