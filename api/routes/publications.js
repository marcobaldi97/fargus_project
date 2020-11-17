const { text } = require('express');
var express = require('express');
var router = express.Router();

var DataBaseMediator = require("../clases/dataBaseMediator");

/* GET home page. */
var miMapa = new Map();
miMapa.set(0, "Este es el cero en el map");
miMapa.set(1, "you are a loser");
var counter = 2; 

function saveInMap(content) {
    miMapa.set(counter, content);
    counter++;
}

function parseMapToArray(){
  const arrayToReturn = new Array();
  for (let i = 0; i<counter; i++){
    arrayToReturn[i] = miMapa.get(i);
  }
  return arrayToReturn;
}// Angry note: arrays in JavaScript are trash! Why do I have to search 5 fking pages to found a not alien
//              alien syntax of a textbook array? 

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/list/', async function(req, res, next) {
  try{
    let dbm = new DataBaseMediator();
    await dbm.executeSelectConsult('SELECT * FROM publications');
    let rowsToList = dbm.getLastSelectDBResponse();
    let responseObject = {
      arraySize: rowsToList.lenght,
      arrayOfPublications: rowsToList
    };
    res.send(responseObject);
  }catch(err){
    let errResponse = 'Something wrong happened in /list/';
    console.log(errResponse);
    res.send(errResponse);
  }
});

router.post('/publish/', function(req, res, next) {
  let textToInput = req.body.textToInput;
  try{
    let dbm = new DataBaseMediator();
    const text = 'INSERT INTO publications(publication_content) VALUES($1);';
    const values = [textToInput];
    dbm.executeInsertConsult(text, values);
    res.send('All cool');//El final.
  }catch(err){
    res.send('Something went wrong! /publish/');
    console.log('wrong in /publish/');
    console.log(err);
  }
});//Working

router.post('/deletePost/', function(req, res, next) {
  try{
    let dbm = new DataBaseMediator();
    let idToDelete = req.body.idToDelete;
    const text = 'DELETE FROM publications WHERE publication_id=$1;'
    const values = [idToDelete];
    dbm.executeDeleteConsult(text, values);
    console.log('publication deleted.');
    res.send('Publication with id='+idToDelete+' deleted.');
  }catch(err){
    let errResponse = 'Something wrong happened in /deletePost/';
    console.log(err);
    res.send(errResponse);
  }
});//to test

module.exports = router;
