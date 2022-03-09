const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const testAPIRouter = require("./routes/testAPI"); //Creo el router que voy a probar.
const publicationsRouter = require("./routes/publications");

const compression = require("compression");
const helmet = require("helmet");

const app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb" }));
app.use(compression({ level: 9 })); //Gzip compression
app.use(helmet());

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

//Debajo de esta linea es donde debo pegar las nuevas direcciones X que haga en /routes . Ej.: /routes/X.js
app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/testAPI", testAPIRouter);
app.use("/publications", publicationsRouter);
app.use("/publications/publish/", publicationsRouter);
app.use("/publications/list/", publicationsRouter);
app.use("/publications/deletePost/", publicationsRouter);
app.use("/publications/viewSinglePost/", publicationsRouter);
app.use("/publications/viewSinglePostResponses/", publicationsRouter);
app.use("/publications/viewCommentResponses/", publicationsRouter);
//---------------------------------------------------------

// catch 404 and forward to error handler
app.use(function (req, res, next) {
	next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get("env") === "development" ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.render("error");
});

module.exports = app;
