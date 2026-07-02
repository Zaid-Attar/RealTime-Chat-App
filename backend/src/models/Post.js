// 1 - create a schema for the note
// 2 - create a model based off the schema
import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true,
        default: "Anonymous"
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
},
{timestamps: true});

const Post = mongoose.model("Post", postSchema);

export default Post;