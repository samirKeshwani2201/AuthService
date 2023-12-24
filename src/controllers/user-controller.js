const UserService = require("../services/user-service");
const userService = new UserService();

const create = async (req, res) => {
    try {
        const user = await userService.create({
            email: req.body.email,
            password: req.body.password
        });
        return res.status(201).json({
            data: user,
            message: "User created successfully",
            err: {},
            success: true
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            data: {},
            message: "Couldnt create the user ",
            err: error,
            success: false
        });
    }
};

const signIn = async (req, res) => {
    try {
        const response = await userService.signIn(req.body.email, req.body.password);
        res.status(200).json({
            data: response,
            message: "Successfully signin",
            err: {},
            success: true
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            data: {},
            message: "Something went wrong  ",
            err: error,
            success: false
        });
    }
};

const isAuthenticated = async (req, res) => {
    try {
        const token = req.headers['x-access-token'];
        const response = await userService.isAuthenticated(token);
        return res.status(200).json({
            success: true,
            err: {},
            data: response,
            message: 'User Authenticated and Token is valid '
        });
        // const result =   userService.verifyToken(token);
        // now its possible that the user deleted the account then more logic needs to be involved so write it in the service layer
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            data: {},
            message: "Something went wrong  ",
            err: error,
            success: false
        });
    }
};

module.exports = {
    create, signIn, isAuthenticated
};
