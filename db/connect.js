const mongoose = require("mongoose");

const connectDb = () => {
	return mongoose.connect(process.env.MONGO_URI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	});
};

module.exports = connectDb;
