
const sendToken = (user, statusCode, res) => {

    //Creating JWT Token
    const token = user.getJwtToken();
    
    //Setting cookies
    const options = {
        expires : new Date(Date.now() + process.env.COOKIE_EXPIRES_TIME * 24 * 60 * 60 *  1000),
        httpOnly: true,
    }
    
    
    const { _id,
		name,
		email,
        avatar,
        role,
        createdAt} = user;
    

    res.status(statusCode)
        .cookie('token', token, options)
        .json({
            success : true,
            token,
            user : {_id,
                name,
                email,
                avatar,
                role,
                createdAt}
        })
}

module.exports = sendToken;