const express = require("express");
const server = express(); //nos regresa un servidor
const port = 8080;
//middleware
server.use(express.json()); // recibir nuestros request

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
es el conjunto de un metodo y una ruta
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

server.get("/koders", (request, response) => {
  const kodersFile = fs.readFile;
  const kodersObject = JSON.parse(kodersFile);
  fs.readFile("/koders", "utf-8", (err, kodersFile) => {
    if (err) throw error;
    console.log(kodersFile);
  });
  response.write(kodersObject);
  response.end();
  //express
  response.status(201);
  response.json({
    koders: [
      {
        name: "Jess",
        gender: "f",
      },
      {
        name: "Vryahn",
        gender: "m",
      },
      {
        name: "Paco",
        gender: "m",
      },
      {
        name: "Aldahir",
        gender: "m",
      },
      {
        name: "Hector",
        gender: "m",
      },
    ],
  });
});

server.listen(8082, () => {
  console.log("Server running on port: 8082");
});
