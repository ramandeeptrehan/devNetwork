const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProfileSchema = new Schema({
    user: { //we will refer 'users' schema as a property in Profile schema
        type: Schema.Types.ObjectId, //associate user with id
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
    },
    experience: [ //array of objects
        {
            title: {
                type: String,
                required: true
            },
            company: {
                type: String,
                required: true
            },
            location: {
                type: String,
            },
            from: {
                type: Date,
                required: true
            },
            to: { //not making it (required: true) since this could be their current job
                type: Date
            },
            current: {
                type: Boolean,
                default: false //default value if false: UI checkbox is unticked, by default
            },
            description: {
                type: String
            }
        }
    ],
    education: [
        {
           school: {
               type: String,
               required: true
           },
           degree: {
               type: String,
               required: true
           },
           fieldOfStudy: {
               type: String,
               required: true
           },
           location: {
            type: String,
        },
        from: {
            type: Date,
            required: true
        },
        to: { //not making it (required: true) since this could be their current job
            type: Date
        },
        current: {
            type: Boolean,
            default: false //default value if false: UI checkbox is unticked, by default
        },
        description: {
            type: String
        }
        }
    ],
    social: [
        {
            youtube: {
                type: String,
            },
            twitter: {
                type: String,
            },
            facebook: {
                type: String,
            },
            instagram: {
                type: String,
            },
            linkedin: {
                type: String,
            }
        }
    ],
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = Profile = mongoose.model('profile', ProfileSchema);
