import mongoose from "./mongoose.js";

const schemas = {
    userSchema: new mongoose.Schema(
        { name: { type: String, required: true } },
        { timestamps: true }
    ),
    projectSchema: new mongoose.Schema(
        { name: { type: String, required: true } },
        { timestamps: true }
    ),
    timeSchema: new mongoose.Schema(
        {
            User: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
                required: true
            },
            Project: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Project",
                required: true
            },
            time: { type: Number, min: 1 },
            formattedTime: {
                type: String,
                required: true,
                match: /^\d{2}:\d{2}:\d{2}$/
            }
        },
        { timestamps: true }
    )
};

const models = {
    User: mongoose.model("User", schemas.userSchema),
    Project: mongoose.model("Project", schemas.projectSchema),
    Time: mongoose.model("Time", schemas.timeSchema)
};

export default models;
