const express = require("express");
const morgan = require("morgan")
const bodyparser = require("body-parser")
const app = express();

const port = 3000;
///RESOURCES/PATHS/METHODS
//DISPLAY ALL HEROES - GET - /
//Add new hero - POST - /newhero - Actually the submission to the database
//Add new hero - GET - /newhero - Page to create
//Edit a hero - GET - /edithero
//Edit a hero - POST(PUT) - /edithero

//Middleware
app.use(morgan('dev'))
//IN SOME CASES BODY-PARSER WILL BE DEPRECATED AND ALREADY INCLUDED IN EXPRESS
app.use(bodyparser.urlencoded({extended: true}))

//View engine
app.set('view engine', 'ejs')
///MOCK DATABASE
const marvelDatabase = [
  {
    id: 0,
    superheroName: "Black Panther",
    numberOfMovies: 1,
  },
  {
    id: 1,
    superheroName: "Captain Marvel",
    numberOfMovies: 2,
  },
  {
    id: 2,
    superheroName: "SpiderMan",
    numberOfMovies: 500,
  },
  {
    id: 3,
    superheroName: "The Incredible Hulk",
    numberOfMovies: 2,
  },
  {
    id: 4,
    superheroName: "Thor",
    numberOfMovies: 3,
  },
]

///////GET ROUTES
//Index page, where a list of all heroes are
app.get("/", (req, res) => {
  res.render("index", {data: marvelDatabase})
})
//Adding a new hero to the database
app.get("/newhero", (req, res) => {
  res.render("newHero")
})
//Editing a specific hero in the database
app.get("/edithero/:id", (req, res) => {
  console.log(marvelDatabase[req.params.id])
  res.render("editHero", {hero: marvelDatabase[req.params.id]})
})

///////POST ROUTES
//Creates a new hero
app.post("/newhero", (req, res) => {
  console.log("Hero is submitted", req.body)
  const newHeroObject = {
    id: marvelDatabase[marvelDatabase.length - 1].id + 1,
    superheroName: req.body.superheroName,
    numberOfMovies: req.body.movies
  }
  marvelDatabase.push(newHeroObject);
  res.redirect("/");
})
//Edits the specific hero, note the id of the hero is passed in
app.post("/edithero/:id", (req, res) => {
  //We use req.params to bring in the parameter set in the url
  const newHeroObject = {
    id: req.params.id,
    superheroName: req.body.superheroName,
    numberOfMovies: req.body.movies
  }
  marvelDatabase[req.params.id] = newHeroObject
  res.redirect("/");
})
//Just a message to run when the server is up and running
app.listen(port, () => console.log('Server is listening on port ' + port))