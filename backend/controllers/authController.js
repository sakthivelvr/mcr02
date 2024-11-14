const User = require("../models/userModel")
const ErrorHandler = require('../utils/errorHandler')
const catchAsyncError = require('../middlewares/catchAsyncError')
//const APIFeatures = require('../utils/apiFeatures')
const sendToken = require("../utils/jwt")
const sendEmail = require("../utils/email")
const crypto = require('crypto');
const {OAuth2Client} = require('google-auth-library');

//REGISTER USER   http://127.0.0.1:8000/api/v1/products
exports.registerUser = catchAsyncError(
    async (req, res, next) => {
        const {name, email, password, phoneNumbers} = req.body;

        let avatar;

        let BASE_URL = process.env.BACKEND_URL;

        if(process.env.NODE_ENV === 'production'){
            BASE_URL = `${req.protocol}://${req.get('host')}` 
        }

        if(req.file) {
            // avatar = `${req.protocol}://${req.host}/uploads/user/${req.file.originalname}`
            avatar = `${BASE_URL}/uploads/user/${req.file.originalname}`

        }
        const user = await User.create({
            name, 
            email, 
            password, 
            avatar,
            phoneNumbers
        })

        sendToken(user, 201, res);     
    }
    

) 

//LOGIN USER   http://127.0.0.1:8000/api/v1/product/new
exports.loginUser = catchAsyncError(
    async (req, res, next) => {
        const {email, password} = req.body;

        if(!email||!password) {
            return next(new ErrorHandler("Please enter the email & password", 400))
        }

        //find the user
        const user = await User.findOne({email}).select('+password')

        if(!user) {
            return next(new ErrorHandler("Invalid email & password", 401))
        }

        if(!await user.isValidPassword(password)){
            return next(new ErrorHandler("Invalid email & password", 401))
        }

        sendToken(user, 201, res);     
    }
) 

//REQUEST - GOOGLE  http://127.0.0.1:8000/api/v1/product/new
exports.googleOAuthRequest = catchAsyncError(
    
    async (req, res, next) => {

        console.log('INSIDE REQUEST GOOGLE OAUTH, 1')

        res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
        res.header('Referrer-Policy', 'no-referrer-when-downgrade');

        const redirectUrl = 'http://127.0.0.1:8000/api/v1/oauth';

        const oAuth2Client = new OAuth2Client(
            process.env.CLIENT_ID,
            process.env.CLIENT_SECRET,
            redirectUrl
        )

        console.log('INSIDE REQUEST GOOGLE OAUTH, 2')


        const authorizeUrl = oAuth2Client.generateAuthUrl({
            access_type: 'offline',
            scope : 'https://www.googleapis.com/auth/userinfo.profile openid https://www.googleapis.com/auth/userinfo.email',
            prompt : 'consent'
        })

        console.log('INSIDE REQUEST GOOGLE OAUTH, 3')


        res.json({url : authorizeUrl})

        
    //     const {email, password} = req.body;

    //     if(!email||!password) {
    //         return next(new ErrorHandler("Please enter the email & password", 400))
    //     }

    //     //find the user
    //     const user = await User.findOne({email}).select('+password')

    //     if(!user) {
    //         return next(new ErrorHandler("Invalid email & password", 401))
    //     }

    //     if(!await user.isValidPassword(password)){
    //         return next(new ErrorHandler("Invalid email & password", 401))
    //     }

    //     sendToken(user, 201, res);     
    }
) 

async function getUserData(access_token){
    console.log("1111111111111111111111 : ")

    console.log("access_token : ", access_token)
    const response = await fetch(`https://www.googleapis.com/oauth2/v3/userinfo?access_token=${access_token}`)
    const data = await response.json();
    console.log('data ', data);

   

}

//GET USER GOOGLE OAUTH http://127.0.0.1:8000/api/v1/product/new
exports.oauth = catchAsyncError(
    
    async (req, res, next) => {
        const code = req.query.code;
        
        try {
            console.log('INSIDE  OAUTH TRY BLOCK, 4')

            const redirectUrl1 = 'http://127.0.0.1:8000/api/v1/oauth';

            const oAuth2Client = new OAuth2Client(
                process.env.CLIENT_ID,
                process.env.CLIENT_SECRET,
                redirectUrl1
            );

            console.log('INSIDE  OAUTH TRY BLOCK, 5')

            const res = await oAuth2Client.getToken(code);
            console.log('INSIDE  OAUTH TRY BLOCK, 6')

            await oAuth2Client.setCredentials(res.tokens);

            console.log('INSIDE  OAUTH TRY BLOCK, 7')

            console.log('Tokens acquired');
            const user = await oAuth2Client.credentials;
            console.log('credentials', user);
            await getUserData(user.access_token);
            console.log('INSIDE  OAUTH TRY BLOCK, 8')


            const redirectUrl2 = 'http://127.0.0.1:3000';

            const oAuth2Client2 = new OAuth2Client(
                process.env.CLIENT_ID,
                process.env.CLIENT_SECRET,
                redirectUrl2
            );
    
            const authorizeUrl = oAuth2Client.generateAuthUrl({
                access_type: 'offline',
                scope : 'https://www.googleapis.com/auth/userinfo.profile openid https://www.googleapis.com/auth/userinfo.email',
                prompt : 'consent'
            })  

            

            
            

            
        } catch (error) {
            console.log('Error with sign in with google :', error);
        }

    }
) 



// LOGOUT USER http://127.0.0.1:8000/api/v1/logout
exports.logoutUser = (req, res, next) => {
    res.cookie('token', null, {
        expires : new Date(Date.now()),
        httpOnly : true
    })
    .status(200)
    .json({
        success : true,
        message : "Logged out"
    })
}

// FORGOT PASSWORD http://127.0.0.1:8000/api/v1//password/forgot
exports.forgotPassword = catchAsyncError( async (req, res, next) => {

    const user = await User.findOne({email : req.body.email});

    if(!user) {
        return next(new ErrorHandler("User not found with this email", 404))
    }

    const resetToken = user.getResetToken();


    await user.save({validateBeforeSave: false});

    //Create reset url
    let BASE_URL = process.env.FRONTEND_URL;

    if(process.env.NODE_ENV === 'production'){
        BASE_URL = `${req.protocol}://${req.get('host')}` 
    }
    

    // const resetUrl = `${req.protocol}://${req.get('host')}/api/v1/password/reset/${resetToken}`
    const resetUrl = `${BASE_URL}/password/reset/${resetToken}`


    const message = `Your password reset url is as follows \n\n 
    ${resetUrl} \n\n If you have not requested this email, then ignore it`

    try {

        sendEmail({
            email : user.email,
            subject : 'MaxicabRide Password recovery',
            message,
        })

        res.status(200).json({
            success : true,
            message : `Email sent to ${user.email}`
        })
    
    } catch (error) {
        user.resetPasswordToken = undefined;
        user.resetPasswordTokenExpire = undefined;

        await user.save({validateBeforeSave: false});
        return next(new ErrorHandler(error.message, 500))
    }

})


// RESET PASSWORD http://127.0.0.1:8000/api/v1/password/reset/:token  
exports.resetPassword = catchAsyncError( async (req, res,next) => {
    console.log("inside restPassword function")

    const resetPasswordToken =  crypto.createHash('sha256').update(req.params.token).digest('hex');


    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordTokenExpire : {
            $gt : Date.now()
        }
    })
    if(!user) {
        return next(new ErrorHandler("Password reset token is invalid or expired"));
    }

    if(req.body.password !== req.body.confirmPassword){
        return next(new ErrorHandler("Password does not match", 400))
    }
    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordTokenExpire = undefined;

    await user.save({validateBeforeSave : false})

    sendToken(user, 201, res)

})


// GER USER PROFILE

exports.getUserProfile = catchAsyncError(async (req, res, next) => {
    const user = await User.findById(req.user.id);

    res.status(200).json({
        success : true,
        user
    })
})

exports.changePassword = catchAsyncError( async (req, res, next) => {
    const user = await User.findById(req.user.id).select('+password');

    //check old password
    if(!await user.isValidPassword(req.body.oldPassword)){
        return next(new ErrorHandler('Old password is incorrect', 401))
    }

    console.log("USER FOUND ", req.body.password)

    //set new password
    user.password = req.body.password;
    await user.save();

    console.log("USER SAVED ");

    res.status(200).json({
        success : true,
        user
    })

})

exports.updateProfile = catchAsyncError( async (req, res, next) => {

    let newUserData = {
        name : req.body.name,
        email : req.body.email
    }

    let avatar;

    let BASE_URL = process.env.BACKEND_URL;

    if(process.env.NODE_ENV === 'production'){
        BASE_URL = `${req.protocol}://${req.get('host')}` 
    }
    
    if(req.file) {
        // avatar = `${req.protocol}://${req.host}/uploads/user/${req.file.originalname}`
        avatar = `${BASE_URL}/uploads/user/${req.file.originalname}`
        newUserData = {...newUserData, avatar} 
    }
        
    const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
        new : true,
        runValidators : true
    })

    res.status(200).json({
        success: true,
        user
    })


})

//ADMIN - GET ALL USERS
exports.getAllUsers = catchAsyncError( async (req, res, next) => {
    const users = await User.find();

    res.status(200).json({
        success : true,
        users
    })
})


//ADMIN - GET SPECIFIC USER
exports.getUser = catchAsyncError( async (req, res, next) => {
    const user = await User.findById(req.params.id);

    if(!user) {
        return next(new ErrorHandler(`User not found with this id ${req.params.id}`, 404))
    }


    res.status(200).json({
        success : true,
        user
    })
})


//ADMIN - UPDATE SPECIFIC USER
exports.updateUser = catchAsyncError( async (req, res, next) => {


    const newUserData = {
        name : req.body.name,
        email : req.body.email,
        role : req.body.role
    }

    const user = await User.findByIdAndUpdate(req.params.id, newUserData, {
        new : true,
        runValidators : true
    })

    res.status(200).json({
        success: true,
        user
    })
})


//ADMIN - DELETE SPECIFIC USER
exports.deleteUser = catchAsyncError( async (req, res, next) => {

    const user = await User.findById(req.params.id);

    if(!user) {
        return next(new ErrorHandler(`User not found with this id ${req.params.id}`, 404))
    }

    await user.deleteOne();

    res.status(200).json({
        success : true
    })

})






