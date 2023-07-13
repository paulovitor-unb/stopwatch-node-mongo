const populateDocumentService = async (modelName, document) => {
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

export default populateDocumentService;
