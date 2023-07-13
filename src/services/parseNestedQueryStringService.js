const parseNestedQueryStringService = (query) => {
    for (let property in query) {
        try {
            query[property] = JSON.parse(query[property]);
        } catch (error) {}
    }

    return query;
};

export default parseNestedQueryStringService;
