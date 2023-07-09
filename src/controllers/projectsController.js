import crud from "../database/crud.js";

const projectsFunctions = {
    create: async (req, res) => {
        try {
            const { data } = req.body;

            const newProjectData = {
                name: data.name
            };

            const newProject = await crud.create(newProjectData, "Project");

            res.status(201).json({ data: newProject });
        } catch (error) {
            if (error.statusCode) {
                res.status(error.statusCode).send(error.message);
                return;
            }
            res.status(500).send(error.message);
        }
    }
};

export default projectsFunctions;
