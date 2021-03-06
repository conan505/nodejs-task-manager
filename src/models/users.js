const mongoose = require('mongoose');
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const Task = require('./tasks');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    age: {
        type: Number,
        validate(value) {
            if (value < 0) throw new Error('Age must be a positive number');
        }
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) throw new Error('Email is invalid');
        }
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 7,
        validate(value) {
            if (value.includes("password")) throw new Error('Password should not contains password');
        }
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }],
    avatar: {
        type: Buffer
    }
}, {
    timestamps: true
})

// Setting virutal property tasks for users

userSchema.virtual('tasks', {
    'ref': 'Task',
    'localField': '_id',
    'foreignField': 'owner'
})

// method for hiding sensitive of user (toJSON is called whenever JSON.stringify is called on an object)

userSchema.methods.toJSON = function () {
    const user = this;
    const userObject = user.toObject();

    delete userObject.password;
    delete userObject.tokens;
    delete userObject.avatar;

    return userObject;

}

// Jwt token generation method ( methods on schema are called by the instance of a model object)

userSchema.methods.generateAuthToken = async function () {
    const user = this;
    const token = await jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET);
    user.tokens.push({ token });
    await user.save();
    return token;
}


// Login method for users (statics on schema are called by the model object)

userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email });
    if (!user) {
        throw new Error('Unable to login')
    }
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
        throw new Error('Unable to login')
    }
    return user;
}

// Middleware for hashing password before saving

userSchema.pre('save', async function (next) {
    const user = this

    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8);
    }

    next();
})

// Middleware for deleting tasks when a user is removed

userSchema.pre('remove', async function (next) {
    const user = this
    await Task.deleteMany({ owner: user._id });
    next()
})

const User = new mongoose.model('User', userSchema)

module.exports = User;
