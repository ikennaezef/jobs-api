const express = require("express");
require("dotenv").config();
require("express-async-errors");
const jobsRoutes = require("./routes/jobRoutes");
const authRoutes = require("./routes/authRoutes");
const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");
const connectDb = require("./db/connect");
const validateToken = require("./middleware/auth");

// Security
const helmet = require("helmet");
const cors = require("cors");
const xss = require("xss-clean");
const rateLimit = require("express-rate-limit");
const port = process.env.PORT || 3001;

const app = express();

// Swagger
const SwaggerUI = require("swagger-ui-express");

const options = {
	customJs: [
		"https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-bundle.min.js",
		"https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-standalone-preset.min.js",
	],
	customCssUrl: [
		"https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui.min.css",
		"https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-standalone-preset.min.css",
		"https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui.css",
	],
};

const swaggerJSON = require("./swagger.json");
app.use("/api-docs", SwaggerUI.serve, SwaggerUI.setup(swaggerJSON, options));

const limiter = rateLimit({
	windowMs: 15 * 60 * 1000,
	max: 100,
});

app.set("trust proxy", 1);
app.use(limiter);
app.use(express.json());

app.use(helmet());
app.use(cors());
app.use(xss());

// Homepage
app.get("/", (req, res) => {
	res.send('<h1>Jobs API</h1><a href="/api-docs">Documentation<a/>');
});

// Routes
app.use("/api/v1/jobs/", validateToken, jobsRoutes);
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
