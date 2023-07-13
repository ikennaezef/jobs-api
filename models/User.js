const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const UserSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, "Please provide a name!"],
	},
	email: {
		type: String,
		required: [true, "Please provide an email!"],
		match: [
			/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
			"Please provide a valid email!",
		],
		unique: true,
	},
	password: {
		type: String,
		required: [true, "Please provide a password!"],
	},
});

UserSchema.methods.createJWT = function () {
	return jwt.sign({ id: this._id, name: this.name }, process.env.JWT_SECRET, {
		expiresIn: process.env.JWT_EXPIRY,
	});
};

module.exports = mongoose.model("User", UserSchema);
