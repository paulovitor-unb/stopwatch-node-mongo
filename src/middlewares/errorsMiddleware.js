const errorsMiddleware = {
    errors: {
        UnauthorizedError: class extends Error {
            constructor(message) {
                super(message);
                this.statusCode = 401;
            }
        },

        NotFoundError: class extends Error {
            constructor(message) {
                super(message);
                this.statusCode = 404;
            }
        }
    },

    checkMissingData: (req, res, next) => {
        if (req.method === "POST" && !req.body.data) {
            res.status(400).send("Missing data object in request body!");
            return;
        }
        next();
    }
};

export default errorsMiddleware;
