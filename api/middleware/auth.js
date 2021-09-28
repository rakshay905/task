const secret = 'lkjlkjlkllkh8hy87xdxsb';
const jwt = require('jsonwebtoken');

exports.auth = function(req, res, next) {
    let accessToken = req.body.accessToken;

    //if there is no token stored in cookies, the request is unauthorized
    if (!accessToken){
        return res.status(403).send({message: "No access token present in request."})
    }

    let payload
    try {
        //use the jwt.verify method to verify the access token
        //throws an error if the token has expired or has a invalid signature
        payload = jwt.verify(accessToken, secret);
        next();
    } catch (e) {
        console.log(e);
        //if an error occured return request unauthorized error
        return res.status(401).send({message: "Invalid access token"});
    }
}
