const errorsMiddleware = {
    errors: {
        BadRequest: class extends Error {
            constructor(message) {
                super(message);
                this.statusCode = 400;
            }
        },

        Unauthorized: class extends Error {
            constructor(message) {
                super(message);
                this.statusCode = 401;
            }
        },

        Forbidden: class extends Error {
            constructor(message) {
                super(message);
                this.statusCode = 403;
            }
        },

        NotFound: class extends Error {
            constructor(message) {
                super(message);
                this.statusCode = 404;
            }
        },

        ResponseError: class extends Error {
            constructor(status, message) {
                super(message);
                this.statusCode = status;
            }
        }
    },

    errorsCheck: {
        missingData: (req, res, next) => {
            if (req.method === "POST" && !req.body.data) {
                return res
                    .status(400)
                    .send("Missing data object in request body!");
            }
            next();
        }
    }
};

export default errorsMiddleware;
