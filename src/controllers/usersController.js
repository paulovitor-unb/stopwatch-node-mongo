import crud from "../database/crud.js";

const usersFunctions = {
    create: async (req, res) => {
        try {
            const { data } = req.body;

            const newUserData = {
                name: data.name
            };

            const newUser = crud.create(newUserData, "User");

            res.status(201).json({ data: newUser });
        } catch (error) {
            if (error.statusCode) {
                res.status(error.statusCode).send(error.message);
                return;
            }
            res.status(500).send(error.message);
        }
    }
};

export default usersFunctions;
