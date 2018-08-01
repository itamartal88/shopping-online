var jwt = require('jsonwebtoken');

function getWebToken(obj){
    return new Promise((resolve,reject) => {
        var token = jwt.sign({obj}, 'secret-key',{expiresIn: 800});
        if(token !== null){
            resolve(token);
        }else{
            reject(Error("token not created"));
        }
    })
}

function verifyToken(req,next){
    jwt.verify(req.headers.authorization, 'secret-key', function(err, decoded) {
        if(err){
         throw err;
        }else{
            req.body.costumer = decoded
            next();
        }
    });
}

module.exports = {
    getWebToken,
    verifyToken
}

