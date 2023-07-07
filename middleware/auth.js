const jwt = require("jsonwebtoken");

const validateToken = (req, res, next) => {
	const authHeader = req.headers.authorization;

	if (!authHeader || !authHeader.startsWith("Bearer")) {
		return res.status(401).send("Authorization Invalid");
	}

	const authToken = authHeader.split(" ")[1];

	try {
		const payload = jwt.verify(authToken, process.env.JWT_SECRET);
		req.user = { id: payload.id, name: payload.name };
		next();
	} catch (error) {
		return res.status(401).send("Authentication error!");
	}
};

module.exports = validateToken;
