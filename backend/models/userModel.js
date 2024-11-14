const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const userSchema = new mongoose.Schema({
    name : {
        type : String,
        required : [true, "Please enter the name"],
        trim : true,
        maxLength : [100, "Product name cannot exceed 100 characters"]
    },
    email : {
        type : String,
        required : [true, "Please enter the Email"],
        trim : true,
        maxLength : [50, "Email ID cannot exceed 50 characters"],
        unique : true,
        validate : [validator.isEmail, "Please enter valid email address"]
    },
    password : {
        type : String,
        required : [true, "Please enter the Password"],
        trim : true,
        maxLength : [6, "Password cannot exceed 6 characters"],
        select : false
    },

    phoneNumbers : [
               { 
                type : String,
                trim : true
            }
    ],
    avatar : {
        type : String
    }, 
    role : {
        type : String,
        default : 'user'
    },

    address: {
            street : {
                type : String,
            },
            postalCode : {
                type : String,
            },
            city : {
                type : String,
            },
            state : {
                type : String,
            },
            country : {
                type : String,
            }
        },

    resetPasswordToken : String,

    resetPasswordTokenExpire : Date


},{timestamps : true})


userSchema.pre('save', async function (next) {
    if(!this.isModified('password')){
        next();
    }
    this.password = await bcrypt.hash(this.password, 10)
})

userSchema.methods.getJwtToken = function () {
    return jwt.sign({id: this.id}, process.env.JWT_SECRET, {
        expiresIn : process.env.JWT_EXPIRES_TIME
    })
}

userSchema.methods.isValidPassword = async function (enteredPassword) {
    return  bcrypt.compare(enteredPassword, this.password)
}

userSchema.methods.getResetToken = function() {
    //Generate Token
    const token = crypto.randomBytes(20).toString('hex');

    //Generate Hash ans set to resetPassword token

    this.resetPasswordToken = crypto.createHash('sha256').update(token).digest('hex')

    //Set token expire time
    this.resetPasswordTokenExpire = Date.now() + 30 * 60 * 1000;
    

    return token;
}

let schema = mongoose.model('User', userSchema)
module.exports = schema


