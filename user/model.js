const { Schema, model } = require('mongoose');

const userTypes = ["admin", "user"];

const UserSchema = new Schema({
    name: {
        type: String, // Use String, not string
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        index: true
    },
    password: {
        type: String,
        required: true,
    },
    user_type: {
        type: String,
        enum: [...userTypes]
    },
    isActive : {
        type : Boolean,
        default : true

    }
}, {
    timestamps: true
});

const UserModel = model("User", UserSchema);

module.exports = {UserModel,userTypes};
