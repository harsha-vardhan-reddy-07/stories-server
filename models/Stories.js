import mongoose, { mongo } from "mongoose";


const storiesSchema = new mongoose.Schema({
    user: {
        type: String,
        required: true
    },
    slidesCount: {
        type: Number,
        required: true
    },
    slides: {
        type: Array,
        required: true
    },
    likesCount: {
        type: Number,
        default: 0
    },
    likes: {
        type: Array,
        default: []
    },
    bookmarks: {
        type: Array,
        default: []
    },
    category: {
        type: String,
        required: true
    }
})

const Stories = mongoose.model("stories", storiesSchema)

export default Stories