const express = require("express");
const cors = require("cors");

const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  const { title, url, techs } = request.body;

  const repository = {
    id: uuid(),
    title,
    url,
    techs,
    likes: 0

  }
  repositories.push(repository);

  return response.json(repository);

});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const { title ,url, techs, likes } = request.body;

  const repository = repositories.find(repository => repository.id === id);
  
  

  if (repository) {
    
    repository.title = title;
    repository.url = url;
    repository.techs = techs;
    

  return response.json(repository)

    
  } else {
    return response.status(400).send();
    
  }
  

});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;

  const repository = repositories.find(repository => repository.id === id);


  if (repository) {
    repositories.pop();
    return response.status(204).send();

  } else {
    return response.status(400).send({ error: 'No repository found'});

  }
});


app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;

  const repository = repositories.find(repository => repository.id === id);

  if (repository) {
    repository.likes += 1;
    return response.json(repository)  
  } else {
    return response.status(400).send();
    
  }

});

module.exports = app;
