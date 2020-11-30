const JWT = require("jsonwebtoken");
const SECRET_KEY = require("../config").SECRET_KEY

module.exports = {
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
    }
}