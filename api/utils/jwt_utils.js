const jwt = require('jsonwebtoken');
exports.generateJWT = function (username, password) {
    const payload = {
        username: username,
        password: password
    };
    let secret = 'lkjlkjlkllkh8hy87xdxsb';
    return jwt.sign(payload, secret , {
        algorithm: "HS256",
        expiresIn: 12600
    });
};

exports.decodingJWT = function(token) {
    console.log("decoding JWT token");
    if(token !== null || token !== undefined){
     const base64String = token.split(".")[1];
     const decodedValue = JSON.parse(Buffer.from(base64String,    
                          "base64").toString("ascii"));
     return decodedValue;
    }
    return null;
  }