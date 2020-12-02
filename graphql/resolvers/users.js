const Bcrypt = require('bcryptjs');
const { UserInputError } = require("apollo-server");

const User = require('../../models/user')
const UserInputValidation = require("../../utils/validators");
const Authentication = require("../../utils/authentication");

module.exports = {
    mutation: {
        async registerUser(parent, { registerUserInput: { username, email, password, confirmPassword } }, context, info) {
            // Validate user data
            let { errors, valid } = UserInputValidation.validateUserInput(username, email, password, confirmPassword);
            if (!valid) {
                throw new UserInputError("Error", { errors });
            }


            // Check whether the user already exists - > 
            //   - TODO: Can use bloom filter to check whether the username already exists..
            const existingUsername = await User.exists({ username })
            if (existingUsername) {
                throw new UserInputError("The username is already taken.", {
                    errors: {
                        username: "The username is already taken."
                    }
                });
            }
            const existingUserEmail = await User.exists({ email })
            if (existingUserEmail) {
                throw new UserInputError("A user with this email id already exists.", {
                    errors: {
                        email: "A user with this email id already exists."
                    }
                })
            }


            // If not, then add the user by hashing the Password and generate auth token
            password = await Bcrypt.hash(password, 12);
            const newUser = User({
                username,
                email,
                password,
                createdAt: new Date().toISOString()
            });

            const addedNewUser = await newUser.save();
            const token = Authentication.generateJwtToken(addedNewUser)
            return {
                ...addedNewUser._doc,
                id: addedNewUser._id,
                token
            }
        },

        async loginUser(parent, { username, password }, context, info) {
            // Validate the input details
            let { errors, valid } = UserInputValidation.validateLoginInpput(username, password);
            if (!valid) {
                throw new UserInputError("Errors", { errors });
            }

            // check if username exists
            const loginUser = await User.findOne({ username });
            if (!loginUser) {
                throw new UserInputError("User doesn't exist.", {
                    errors: {
                        username: "User doesn't exist."
                    }
                });
            }

            // check if entered password is correct
            let matchPassword = await Bcrypt.compare(password, loginUser.password);
            if (!matchPassword) {
                throw new UserInputError("Wrong credentials.", {
                    errors: {
                        password: "Wrong credentials."
                    }
                });
            }

            // If verified user, generate a jwt token
            const token = Authentication.generateJwtToken(loginUser);

            return {
                ...loginUser._doc,
                id: loginUser._id,
                token
            }
        }
    }
}
