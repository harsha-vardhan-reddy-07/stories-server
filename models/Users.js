import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    stories: {
        type: Array,
        default: []
    },
    bookmarks: {
        type: Array,
        default: []
    }
})

const Users = mongoose.model("users", userSchema)
export default Users

