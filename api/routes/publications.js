const { text } = require('express');
var express = require('express');
var router = express.Router();

var DataBaseMediator = require("../clases/dataBaseMediator");

/* GET home page. */

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/list/', async function(req, res, next) {
  try{
    const publicationId = req.body.itemToSearch;
    let dbm = new DataBaseMediator();
    await dbm.executeSelectConsult('SELECT * FROM publications WHERE publication_father = '+publicationId+' ORDER BY publication_id');
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

router.post('/publish/', async function(req, res, next) {
  const textToInput = req.body.textToInput;
  const fatherId = parseInt(req.body.responseTo);
  const imgFile = req.body.imgFile;
  try{
    let dbm = new DataBaseMediator();
    const text = 'INSERT INTO publications(publication_content, publication_father, image_file) VALUES($1,$2,$3);';
    const values = [textToInput, fatherId, imgFile];
    await dbm.executeInsertConsult(text, values); //Esto tendría que ser async
  }catch(err){
    res.send('Something went wrong! /publish/');
    console.log('Error in /publish/');
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

router.post('/viewSinglePostResponses/', async function(req, res, next) {
  try{
    let postId = req.body.post_id;
    let dbm = new DataBaseMediator();
    let consult = 'SELECT * FROM publications WHERE publication_father = '+postId+' ORDER BY publication_id;';
    await dbm.executeSelectConsult(consult);
    let rowsToList = dbm.getLastSelectDBResponse();
    let responseObject = {
      arraySize: rowsToList.lenght,
      arrayOfPublications: rowsToList
    };
    res.send(responseObject);
  }catch(err){
    console.log('Ups! '+err);
    res.send('Somenthing went wrong in /viewSinglePostResponses')
  }
});
module.exports = router;

router.post('/viewSinglePost/', async function(req, res, next) {
  try{
    let postId = req.body.post_id;
    let dbm = new DataBaseMediator();
    let consult = 'SELECT * FROM publications WHERE publication_id = '+postId+';';
    await dbm.executeSelectConsult(consult);
    let rowsToList = dbm.getLastSelectDBResponse();
    let responseObject = {
      arraySize: rowsToList.lenght,
      arrayOfPublications: rowsToList
    };
    res.send(responseObject);
  }catch(err){
    console.log('Ups! '+err);
    res.send('Somenthing went wrong in /viewSinglePostResponses')
  }
});
module.exports = router;
