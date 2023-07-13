const Job = require("../models/Job");

const getJobs = async (req, res) => {
	const jobs = await Job.find({ createdBy: req.user.id });

	res.status(200).json(jobs);
};

const getJob = async (req, res) => {
	const job = await Job.findOne({ _id: req.params.id, createdBy: req.user.id });
	if (!job) {
		return res.status(404).json({ message: "Job not found!" });
	}
	res.status(200).json(job);
};

const createJob = async (req, res) => {
	req.body.createdBy = req.user.id;
	const job = await Job.create(req.body);

	if (!job) {
		return res.status(400).json({ message: "Could not create job!" });
	}

	res.status(201).json(job);
};

const updateJob = async (req, res) => {
	const {
		body: { company, position },
		user: { id: userId },
		params: { id: jobId },
	} = req;

	const job = await Job.findOneAndUpdate(
		{ _id: jobId, createdBy: userId },
		req.body,
		{ new: true, runValidators: true }
	);

	if (!job) {
		return res.status(404).json({ message: "Job not found!" });
	}

	res.status(200).json(job);
};

const deleteJob = async (req, res) => {
	const {
		user: { id: userId },
		params: { id: jobId },
	} = req;

	const job = await Job.findOneAndRemove({ _id: jobId, createdBy: userId });

	if (!job) {
		return res.status(404).json({ message: "Job not found!" });
	}

	res.status(200).json({ message: "Deleted successfully!" });
};

module.exports = {
	getJobs,
	getJob,
	createJob,
	updateJob,
	deleteJob,
};
