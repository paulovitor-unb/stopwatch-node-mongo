import crud from "../database/crud.js";
import parseNestedQueryStringService from "../services/parseNestedQueryStringService.js";

const routerController = {
    create: async (req, res) => {
        try {
            const { name } = req.params;
            const { data } = req.body;

            let newData = {};
            switch (name) {
                case "users":
                case "projects":
                    newData = { name: data.name };
                    break;
                case "times":
                    newData = {
                        User: data.userId,
                        Project: data.projectId,
                        time: data.time,
                        formattedTime: data.formattedTime
                    };
                    break;
                default:
                    break;
            }

            const newDocument = await crud.create(models[name], newData);

            res.status(201).json({ data: newDocument });
        } catch (error) {
            if (error.statusCode) {
                res.status(error.statusCode).send(error.message);
                return;
            }
            res.status(500).send(error.message);
        }
    },

    readList: async (req, res) => {
        try {
            const { name } = req.params;
            const query = parseNestedQueryStringService(req.query);

            const searchQuery = { ...query };

            const documentsList = await crud.readList(
                models[name],
                searchQuery
            );

            res.status(200).json({ data: documentsList });
        } catch (error) {
            if (error.statusCode) {
                res.status(error.statusCode).send(error.message);
                return;
            }
            res.status(500).send(error.message);
        }
    },

    read: async (req, res) => {
        try {
            const { name, id } = req.params;

            const document = await crud.read(models[name], id);

            res.status(200).json({ data: document });
        } catch (error) {
            if (error.statusCode) {
                res.status(error.statusCode).send(error.message);
                return;
            }
            res.status(500).send(error.message);
        }
    },

    update: async (req, res) => {
        try {
            const { name, id } = req.params;
            const { data } = req.body;

            const updateData = { ...data };

            const updatedDocument = await crud.update(
                models[name],
                id,
                updateData
            );

            res.status(200).json({ data: updatedDocument });
        } catch (error) {
            if (error.statusCode) {
                res.status(error.statusCode).send(error.message);
                return;
            }
            res.status(500).send(error.message);
        }
    }
};

const models = { users: "User", projects: "Project", times: "Time" };

export default routerController;
