import models from "../database/models.js";

const crud = {
    create: async (data, modelName) => {
        try {
            const newDocument = await models[modelName].save(data);
            return newDocument;
        } catch (error) {
            throw error;
        }
    }
};

export default crud;
