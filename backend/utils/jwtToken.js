// Create Token and saving in cookie
const sendToken = (user, statusCode, res) => {



    const token = user.getJWTToken();
    console.log('token', token)

    //option for cookie //so if we want to send something in cookie so there is options for that
    //so instead of direct writing in cookie we make option variable

    const options = {
        // from this we get to know when our cookie get expired or expiry timing
        expires: new Date(
            Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
            // Date.now() means whenever our cookie generate
            //here process.env.COOKIE_EXPIRE is days like 2,3,4 days 
            //and process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000 means converting it into milliseconds
        ),
        httpOnly: true,
    };
    
    res.status(statusCode).cookie("token", token, options).json({
        success: true,
        user,
        token,
    })

}

module.exports = sendToken;