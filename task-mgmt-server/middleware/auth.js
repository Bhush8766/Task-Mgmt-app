const jwt = require("jsonwebtoken");
require("dotenv").config();

function auth(req, res, next) {

    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).send({
            success:false,
            msg:"Please Login"
        });
    }

    if (!authHeader.startsWith("Bearer ")) {
        return res.status(401).send({
            success:false,
            msg:"Invalid Token"
        });
    }

    try {

        const token = authHeader.split(" ")[1];

        const decoded = jwt.verify(token, process.env.SECRET_KEY);

        req.user = decoded;

        next();

    } catch (err) {

        return res.status(401).send({
            success:false,
            msg:"Invalid Token"
        });

    }

}

function admin(req,res,next){

    console.log(req.user);

    if(req.user.role==="admin"){
        return next();
    }

    return res.status(403).send({
        success:false,
        msg:"Only Admin Can Perform This Action"
    });

}

module.exports={auth,admin};