const errorsMiddleware = {
    errors: {},

    checkMissingData: (req, res, next) => {
        if (req.method === "POST" && !req.body.data) {
            res.status(400).send("Missing data object in request body!");
            return;
        }
        next();
    }
};

export default errorsMiddleware;
