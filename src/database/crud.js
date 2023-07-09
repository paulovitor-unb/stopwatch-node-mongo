import models from "../database/models.js";

const crud = {
    create: async (data, modelName) => {
        try {
            const document = new models[modelName](data);
            const newDocument = await document.save();

            if (populateData[modelName]?.length > 0) {
                await populateDocument(newDocument, modelName);
            }

            return newDocument;
        } catch (error) {
            throw error;
        }
    }
};

const populateDocument = async (document, modelName) => {
    for (const data of populateData[modelName]) {
        await document.populate(data);
    }
};

const populateData = {
    Time: [
        { path: "User", select: "-_id name" },
        { path: "Project", select: "-_id name" }
    ]
};

export default crud;
