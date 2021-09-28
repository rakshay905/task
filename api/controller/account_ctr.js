// const bodyParser = require ('body-parser');
// var account_model = require('../models/account_model.js');
var async_utils = require('../utils/async_utils');
var JWT_utils = require('../utils/jwt_utils');

/**
 * login: check login validation of sellers
 */
exports.login = function (req, res, callback) {
    console.log('In account login');
    var username = req.body.username;
    var password = req.body.password;
    var role = req.body.role;

    if (!username || !password) {
        res.statusCode = 400;
        res.setHeader('content-type', 'application/json');
        res.send({'message': 'Please enter required details first.'});
        return;
    }
    async_utils.waterfall([
        function(callback) {
            if (password === "password" && username === "abcd@1234.com") { // here we can add checks for validating the username and password
                callback(null, {message: "Login success."});               // from database.
            } else {
                callback({message: 'Invalid credentials'}, null);
            }
        },
    ], function(err, results) {
        if (err) {
            console.log(err);
            res.statusCode = 401;
            res.setHeader('content-type', 'application/json');
            res.send(err);
        } else {
            const accessToken = JWT_utils.generateJWT(
                username,
                password
            )
            // res.cookie("jwt", accessToken, {httpOnly: true})
            res.statusCode = 200;
            res.setHeader('content-type', 'application/json');
            res.send({accessToken: accessToken});
        }
    });
}

exports.profile = function (req, res, callback) {
    console.log('profile');
    if (req.body && req.body.accessToken) {
        let data = JWT_utils.decodingJWT(req.body.accessToken);
        let obj = {
            username: data.username,
            password: data.password
        };
        res.send(obj);
    } else {
        res.status(400).send({message: "Missing data."});
    }
}