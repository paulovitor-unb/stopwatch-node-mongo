import crud from "../database/crud.js";

const timesController = {
    create: async (req, res) => {
        try {
            const { data } = req.body;

            const newTimeData = {
                User: data.userId,
                Project: data.projectId,
                time: data.time,
                formattedTime: data.formattedTime
            };

            const newTime = await crud.create(newTimeData, "Time");

            res.status(201).json({ data: newTime });
        } catch (error) {
            if (error.statusCode) {
                res.status(error.statusCode).send(error.message);
                return;
            }
            res.status(500).send(error.message);
        }
    }
};

export default timesController;
