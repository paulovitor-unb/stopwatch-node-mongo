import models from "../database/models.js";
import populateDocumentService from "../services/populateDocumentService.js";
import errorsMiddleware from "../middlewares/errorsMiddleware.js";
const { errors } = errorsMiddleware;

const modelsController = {
    create: async (modelName, data) => {
        const document = new models[modelName](data);
        const newDocument = await document.save();

        await populateDocumentService(modelName, newDocument);

        return newDocument;
    },

    readList: async (modelName, data) => {
        const { find, select, sort, limit } = data;

        const documentsList = await models[modelName]
            .find(find)
            .select(select)
            .sort(sort)
            .limit(limit);

        for (document of documentsList) {
            await populateDocumentService(modelName, document);
        }

        return documentsList;
    },

    read: async (modelName, id) => {
        const document = await models[modelName].findById(id);

        if (!document) {
            throw new errors.NotFound(`${modelName} with id ${id} not found!`);
        }

        await populateDocumentService(modelName, document);

        return document;
    },

    update: async (modelName, id, data) => {
        const updatedDocument = await models[modelName].findByIdAndUpdate(
            id,
            data,
            { new: true }
        );

        if (!document) {
            throw new errors.NotFound(`${modelName} with id ${id} not found!`);
        }

        await populateDocumentService(modelName, updatedDocument);

        return updatedDocument;
    }
};

export default modelsController;
