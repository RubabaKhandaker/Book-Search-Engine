const { GraphQLError } = require('graphql');
const jwt = require('jsonwebtoken');

// secret token and expiration
const secret = 'mysecretsshhhhh';
const expiration = '2h';

module.exports = {

	// auth error handle
	AuthenticationError: new GraphQLError('Uh oh, unable to authenticate user!', {

		extensions: {

			code: 'UNAUTHENTICATED',

		},

	}),

	// auth routes function
	authMiddleware: function ({ req }) {

		// for token to be sent via  req.query or headers
		let token = req.query.token || req.headers.authorization;

		if (req.headers.authorization) {

			token = token.split(' ').pop().trim();

		}

		if (!token) {

			return req;

		}

		try {

			const { data } = jwt.verify(token, secret, { maxAge: expiration });
			req.user = data;

		} catch {

			console.log('Oh no, this token is invalid!');

		}

		return req;

	},

	signToken: function ({ username, email, _id }) {

		const payload = { username, email, _id };

		return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
    
	},

};