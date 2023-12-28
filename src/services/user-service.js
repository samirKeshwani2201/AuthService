const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt");
const UserRepository = require("../repository/user-repository");
const { JWT_KEY } = require("../config/serverConfig");
const AppErrors = require('../utils/error-handler');
class UserService {
    constructor() {
        this.userRepository = new UserRepository();
    }
    async create(data) {
        try {
            const user = this.userRepository.create(data);
            return user;
        } catch (error) {
            if (error.name == "SequelizeValidationError") {
                throw error;
            }
            console.log("Something went wrong on service layer ");
            throw error;
        }
    }
    async signIn(email, password) {
        try {
            // step 1 get the user 
            const user = await this.userRepository.getByEmail(email);
            // step 2   validate the password with hash
            const check = this.checkPassword(password, user.password);
            if (!check) {
                console.log("Wrong Password ");
                throw { error: "Incorrect Password" };
            }
            // step 3: generate the token :
            const jwtoken = this.createToken({ email: user.email, id: user.id });
            return jwtoken;
        } catch (error) {
            console.log("Something went wrong on service layer ");
            throw error;
        }
    }
    async isAuthenticated(token) {
        try {
            const response = this.verifyToken(token);
            if (!response) {
                throw { error: "Invalid Token" };
            }
            const user = await this.userRepository.getById(response.id);
            if (!user) {
                throw { error: "User Not found with current token" };
            }
            return user.id;
        } catch (error) {
            console.log("Something went wrong on service layer ");
            throw error;
        }
    }
    async isAdmin(userId) {
        try {
            return this.userRepository.isAdmin(userId);
        } catch (error) {

            console.log("Something went wrong on service layer in isAdmin function");
            throw error;
        }
    }
    createToken(user) {
        try {
            const result = jwt.sign(user, JWT_KEY, { expiresIn: "1d" });
            return result;
        } catch (error) {
            console.log("Something went wrong on service layer ");
            throw error;
        }
    }
    verifyToken(token) {
        try {
            return jwt.verify(token, JWT_KEY);
        } catch (error) {
            console.log("Something went wrong on service layer ", error);
            throw error;
        }
    }
    checkPassword(plainPassowrd, encryptedPassword) {
        try {
            return bcrypt.compareSync(plainPassowrd, encryptedPassword);
        } catch (error) {
            console.log("Something went wrong on service layer ");
            throw error;
        }
    }

}

module.exports = UserService; 