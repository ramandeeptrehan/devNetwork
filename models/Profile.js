const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProfileSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    handle: {
        type: String,
        required: true,
        max: 40
    },
    company: {
        type: String,
        required: false
    },
    website: {
        type: String,
    },
    location: {
        type: String,
    },
    status: {
        type: String,
        required: true //will give them drop down: Junior Dev, SDE2, SDM, etc
    },
    skills: {
        type: [String], //array of strings
        required: true
    },
    bio: {
        type: String
    },
    githubUserName: {
        type: String
    }
});