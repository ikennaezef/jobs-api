const mongoose = require("mongoose");

const JobSchema = new mongoose.Schema(
	{
		company: {
			type: String,
			required: [true, "Please add a company!"],
			maxlength: 50,
		},
		position: {
			type: String,
			required: [true, "Please provide a position"],
			maxlength: 100,
		},
		status: {
			type: String,
			enum: ["pending", "interview", "rejected"],
			default: "pending",
		},
		createdBy: {
			type: mongoose.Types.ObjectId,
			ref: "User",
			required: [true, "Please provide a user!"],
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model("Job", JobSchema);
