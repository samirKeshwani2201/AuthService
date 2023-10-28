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

module.exports = {
    create
};
