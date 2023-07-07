const express = require("express");
require("dotenv").config();
require("express-async-errors");
const jobsRoutes = require("./routes/jobRoutes");
const authRoutes = require("./routes/authRoutes");
const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");
const connectDb = require("./db/connect");

const app = express();
app.use(express.json());
const port = 5000;

app.get("/", (req, res) => {
	res.send("<h1>Jobs API</h1>");
});

app.use("/api/v1/jobs/", jobsRoutes);
app.use("/api/v1/auth/", authRoutes);

app.use(errorHandlerMiddleware);
app.use(notFoundMiddleware);

const start = async () => {
	try {
		await connectDb();
		app.listen(port, console.log(`APP RUNNING ON PORT ${port}`));
	} catch (error) {
		console.log("COULD NOT START SERVER...", error);
	}
};

start();
