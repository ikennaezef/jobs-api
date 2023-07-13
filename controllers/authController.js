const User = require("../models/User");
const bcrypt = require("bcrypt");

const register = async (req, res) => {
	try {
		const { name, email, password } = req.body;

		if (!name || !email || !password) {
			return res.status(400).json({ message: "All fields are required!" });
		}

		const userExists = await User.findOne({ email });
		if (userExists) {
			return res.status(400).json({ message: "The email is already in use!" });
		}

		const hashedPassword = await bcrypt.hash(password, 10);

		const user = await User.create({ name, email, password: hashedPassword });

		if (!user) {
			return res
				.status(500)
				.json({ message: "An error occured while creating the user!" });
		}

		const token = user.createJWT();
		res.status(201).json({
			user: {
				_id: user.id,
				name: user.name,
				email: user.email,
			},
			token,
		});
	} catch (error) {
		if (error.message) {
			res.status(500).json({ message: error.message });
		} else {
			res.status(500).json(error.message);
		}
	}
};

const login = async (req, res) => {
	const { email, password } = req.body;

	if (!email || !password) {
		return res
			.status(400)
			.json({ message: "Please provide email and password!" });
	}

	const user = await User.findOne({ email });

	if (!user) {
		return res.status(401).json({ message: "User does not exist!" });
	}

	const passwordMatch = await bcrypt.compare(password, user.password);

	if (!passwordMatch) {
		return res.status(401).json({ message: "Invalid email or password!" });
	}

	const token = user.createJWT();
	res.status(200).json({
		user: {
			_id: user.id,
			name: user.name,
			email: user.email,
		},
		token,
	});
};

module.exports = { login, register };
