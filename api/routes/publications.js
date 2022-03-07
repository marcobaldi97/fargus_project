const { text } = require("express");
const express = require("express");
const cors = require("cors");
const router = express.Router();

const DataBaseMediator = require("../classes/dataBaseMediator");

const corsOptions = {
	origin: "http://localhost:3000",
	optionsSuccessStatus: 200,
};

router.get("/", cors(corsOptions), function (req, res, next) {
	res.render("index", { title: "Express" });
});

router.post("/list/", cors(corsOptions), async function (req, res, next) {
	try {
		const publicationId = req.body.itemToSearch;
		const dbm = new DataBaseMediator();

		await dbm.executeSelectConsult("SELECT * FROM publications WHERE publication_father = " + publicationId + " ORDER BY publication_id");

		const rowsToList = dbm.getLastSelectDBResponse();

		const responseObject = {
			arraySize: rowsToList.lenght,
			arrayOfPublications: rowsToList,
		};

		res.send(responseObject);
	} catch (err) {
		res.send("Something wrong happened in /list/");

		console.log(err);
	}
});

router.post("/publish/", cors(corsOptions), async function (req, res, next) {
	const textToInput = req.body.textToInput;
	const fatherId = parseInt(req.body.responseTo);
	const imgFile = req.body.imgFile;

	try {
		const dbm = new DataBaseMediator();
		const text = "INSERT INTO publications(publication_content, publication_father, image_file) VALUES($1,$2,$3);";
		const values = [textToInput, fatherId, imgFile];

		await dbm.executeInsertConsult(text, values);

		res.send("ready!");
	} catch (err) {
		res.send("Something went wrong! /publish/");

		console.log("Error in /publish/");
		console.log(err);
	}
});

router.post("/deletePost/", cors(corsOptions), async function (req, res, next) {
	try {
		const dbm = new DataBaseMediator();
		const idToDelete = req.body.idPost;
		const text = "DELETE FROM publications WHERE publication_id=$1;";
		const values = [idToDelete];

		await dbm.executeDeleteConsult(text, values);

		console.log("publication deleted.");

		res.send("Publication with id=" + idToDelete + " deleted.");
	} catch (err) {
		res.send("Something wrong happened in /deletePost/");

		console.log(err);
	}
});

router.post("/viewSinglePostResponses/", cors(corsOptions), async function (req, res, next) {
	try {
		const postId = req.body.idPost;
		const onlyIds = req.body.onlyIds;
		const dbm = new DataBaseMediator();
		const consult = !onlyIds ? "SELECT * FROM publications WHERE publication_father = " + postId + " ORDER BY publication_id;" : "SELECT publication_id FROM publications WHERE publication_father = " + postId + " ORDER BY publication_id;";

		await dbm.executeSelectConsult(consult);

		const publications = dbm.getLastSelectDBResponse();

		const responseObject = {
			arraySize: publications.lenght,
			arrayOfPublications: publications,
		};

		res.send(responseObject);
	} catch (err) {
		res.send("Somenthing went wrong in /viewSinglePostResponses");

		console.log(err);
	}
});

router.post("/viewSinglePost/", cors(corsOptions), async function (req, res, next) {
	try {
		const postId = req.body.idPost;
		const dbm = new DataBaseMediator();
		const consult = "SELECT * FROM publications WHERE publication_id = " + postId + ";";

		await dbm.executeSelectConsult(consult);

		const rowsToList = dbm.getLastSelectDBResponse();

		const responseObject = {
			arraySize: rowsToList.lenght,
			arrayOfPublications: rowsToList,
		};

		res.send(responseObject);
	} catch (err) {
		res.send("Somenthing went wrong in /viewSinglePostResponses");

		console.log(err);
	}
});

module.exports = router;
