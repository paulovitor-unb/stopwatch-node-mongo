import modelsController from "./modelsController.js";
import parseNestedQueryStringService from "../services/parseNestedQueryStringService.js";
import errorsMiddleware from "../middlewares/errorsMiddleware.js";
const { errors } = errorsMiddleware;

const routerController = {
    create: async (req, res) => {
        try {
            const { modelName } = req.params;
            const { data } = req.body;

            let newData;
            switch (modelName) {
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
                    throw new errors.BadRequest(`Invalid model ${modelName}`);
            }

            const newDocument = await modelsController.create(
                models[modelName],
                newData
            );

            res.status(201).json({ data: newDocument });
        } catch (error) {
            if (error.statusCode) {
                return res.status(error.statusCode).send(error.message);
            }
            res.status(500).send(error.message);
        }
    },

    readList: async (req, res) => {
        try {
            const { modelName } = req.params;
            const query = parseNestedQueryStringService(req.query);

            const searchQuery = { ...query };

            const documentsList = await modelsController.readList(
                models[modelName],
                searchQuery
            );

            res.status(200).json({ data: documentsList });
        } catch (error) {
            if (error.statusCode) {
                return res.status(error.statusCode).send(error.message);
            }
            res.status(500).send(error.message);
        }
    },

    read: async (req, res) => {
        try {
            const { modelName, id } = req.params;

            const document = await modelsController.read(models[modelName], id);

            res.status(200).json({ data: document });
        } catch (error) {
            if (error.statusCode) {
                return res.status(error.statusCode).send(error.message);
            }
            res.status(500).send(error.message);
        }
    },

    update: async (req, res) => {
        try {
            const { modelName, id } = req.params;
            const { data } = req.body;

            const updateData = { ...data };

            const updatedDocument = await modelsController.update(
                models[modelName],
                id,
                updateData
            );

            res.status(200).json({ data: updatedDocument });
        } catch (error) {
            if (error.statusCode) {
                return res.status(error.statusCode).send(error.message);
            }
            res.status(500).send(error.message);
        }
    }
};

const models = { users: "User", projects: "Project", times: "Time" };

export default routerController;
