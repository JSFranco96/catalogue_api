import { Schema, model } from "mongoose";

const tagsSchema = new Schema(
    {
        tag: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
)

const Tag = model('tags', tagsSchema)

export { Tag }