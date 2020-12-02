const JWT = require("jsonwebtoken");
const { AuthenticationError } = require("apollo-server")

const SECRET_KEY = require("../config").SECRET_KEY

module.exports = {
    // Generates a JWT token
    generateJwtToken(user, expiresIn = "1h") {
        return JWT.sign(
            {
                id: user.id,
                username: user.username,
                email: user.email
            },
            SECRET_KEY,
            {
                expiresIn: expiresIn
            }
        );
    },
    // Checks Authorization - if given token is valid, it will return the user object,
    // if not, it will throw an authentication error.
    checkAuthorization(token) {
        // TODO: check if the token is correct and is present.
        if (!token || token === '') {
            throw new Error("Token not present.")
        }

        // TODO: Check if token is valid.
        try {
            const user = JWT.verify(token, SECRET_KEY);
            if (user) {
                return user;
            }
        } catch (error) {
            throw new AuthenticationError("Invalid / Expired Token.");
        }
    }
}