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
		const publication_id = req.body.publication_id;
		const dbm = new DataBaseMediator();

		await dbm.executeSelectConsult("SELECT * FROM publications WHERE publication_father = " + publication_id + " ORDER BY publication_id");

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
	const publication_content = req.body.publication_content;
	const publication_father = req.body.publication_father;
	const original_publication_id = req.body.original_publication_id;
	const image_file = req.body.image_file;

	try {
		const dbm = new DataBaseMediator();
		const text = "INSERT INTO publications(publication_content, publication_father, image_file, original_publication_id) VALUES($1,$2,$3,$4);";
		const values = [publication_content, publication_father, image_file, original_publication_id ?? publication_father];

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
		const publication_id = req.body.publication_id;
		const text = "DELETE FROM publications WHERE publication_id=$1;";
		const values = [publication_id];

		await dbm.executeDeleteConsult(text, values);

		res.send("Publication with id=" + idToDelete + " deleted.");
	} catch (err) {
		res.send("Something wrong happened in /deletePost/");

		console.log(err);
	}
});

router.post("/viewSinglePostResponses/", cors(corsOptions), async function (req, res, next) {
	try {
		const publication_id = req.body.publication_id;
		const onlyIds = req.body.onlyIds;
		const dbm = new DataBaseMediator();

		const consult = !onlyIds ? "SELECT * FROM publications WHERE original_publication_id = " + publication_id + " ORDER BY publication_id;" : "SELECT publication_id FROM publications WHERE original_publication_id = " + publication_id + " ORDER BY publication_id;";

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

router.post("/viewCommentResponses/", cors(corsOptions), async function (req, res, next) {
	try {
		const publication_id = req.body.publication_id;
		const onlyIds = req.body.onlyIds;
		const dbm = new DataBaseMediator();

		const consult = !onlyIds
			? "SELECT * FROM publications WHERE publication_father = " + publication_id + " OR original_publication_id = " + publication_id + " ORDER BY publication_id;"
			: "SELECT publication_id FROM publications WHERE publication_father = " + publication_id + " OR original_publication_id = " + publication_id + "  ORDER BY publication_id;";

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
		const publication_id = req.body.publication_id;
		const dbm = new DataBaseMediator();
		const consult = "SELECT * FROM publications WHERE publication_id = " + publication_id + ";";

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
