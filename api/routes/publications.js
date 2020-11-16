const { text } = require('express');
var express = require('express');
var router = express.Router();
import dataBaseMediator from '../clases/dataBaseMediator';

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
  for (var i = 0; i<counter; i++){
    arrayToReturn[i] = miMapa.get(i);
  }
  return arrayToReturn;
}// Angry note: arrays in JavaScript are trash! Why do I have to search 5 fking pages to found a not alien
//              alien syntax of a textbook array? 

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/list/', function(req, res, next) {
  try{
    let index = req.body.itemToSearch;
    if(req.body.itemToSearch <= counter) {
      /*var responseObject = {
        postId : req.body.itemToSearch,
        postContent : miMapa.get(req.body.itemToSearch)
      };*/
      var responseObject = {
        arraySize: counter,
        arrayOfPublications: parseMapToArray()
      };
      res.send(responseObject);
    } else {
      var responseObject = {
        postId : req.body.itemToSearch,
        postContent : 'Out of Boundries'
      };
      res.send(responseObject);
      console.log('Requested index is out of boundries')
    }
    
  }catch(err){
    var errResponse = 'Something wrong happened in /list';
    console.log(errResponse);
    res.send(errResponse);
  }
});

router.post('/publish/', function(req, res, next) {
  var textToInput = req.body.textToInput;
  try{
    //--------------------------↓↓For debugging↓↓-----------------------------
    //console.log(textToInput);
    /*for (var [clave, valor] of miMapa) {
      console.log(clave + " = " + valor);
    }*/
    //--------------------------↑↑For debugging↑↑-----------------------------
    saveInMap(textToInput);
    res.send('All green');//El final.
  }catch(err){
    res.send('Something went wrong!');
    console.log('wrong in /publish/');
  }
});

router.post('/deletePost/', function(req, res, next) {
  try{
    let dbm = new dataBaseMediator();
    let textToInput = req.body.idToDelete;
    const queryToDelete = 'DELETE FROM publications WHERE id_publication = '+textToInput+';'
    dbm.executeDeleteConsult(queryToDelete);
    console.log('publication deleted.')
  }catch(err){
    var errResponse = 'Something wrong happened in /deletePost/';
    console.log(errResponse);
    res.send(errResponse);
  }
});

module.exports = router;
