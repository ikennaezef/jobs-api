const express = require("express");
const {
	getJobs,
	createJob,
	getJob,
	updateJob,
	deleteJob,
} = require("../controllers/jobsController");

const router = express.Router();

router.get("/", getJobs);
router.post("/", createJob);
router.get("/:id", getJob);
router.patch("/:id", updateJob);
router.delete("/:id", deleteJob);

module.exports = router;
