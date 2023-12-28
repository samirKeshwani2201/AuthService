const { StatusCodes } = require("http-status-codes");

class AppErrors extends Error {
    constructor( 
        name = "AppError",
        message = "Something went wrong",
        explanation = "Something went wrong",
        statuscode = StatusCodes.INTERNAL_SERVER_ERROR
    ) {
        super();
        this.message = message;
        this.name = name;
        this.explanation = explanation;
        this.statuscode = statuscode;
    }
}

module.exports = AppErrors;