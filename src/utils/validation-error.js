const AppErrors = require("./error-handler");
const { StatusCodes } = require("http-status-codes");

class ValidationError extends AppErrors {
    constructor(error) {
        let name = error.name, message = "Not able to validate the data sent in the request", explanation = error.errors.map((singleError) => singleError.message
        );
        super(
            name,
            message,
            explanation,
            StatusCodes.BAD_REQUEST
        );
    }
}

module.exports = ValidationError;