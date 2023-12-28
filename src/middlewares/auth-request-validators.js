const validateAuthUser = (req, res, next) => {
    if (!req.body.email || !req.body.password) {
        return res.status(400).json({
            success: false,
            data: {},
            message: "Something went wrong ",
            err: "Email or password missing in the request "
        });
    }
    next();
};


const validateisAdminRequest = (req, res, next) => {
    if (!req.body.userId) {
        return res.status(400).json({
            success: false,
            data: {},
            message: "Something went wrong ",
            err: "userId is missing in the request"
        });
    }
    next();
};

module.exports = {
    validateAuthUser, validateisAdminRequest
};