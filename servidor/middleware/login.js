const jwt = require("jsonwebtoken")


module.exports = (req, res, next) => {
        try {
            const decode = jwt.verify(req.body.token, process.env.SECRET)
            req.usuario = decode
            next()
        } catch (error) {
            return res.status(401).send({ menssagem: 'Falha na autentificação token' })
        }
    }
    /* 

    module.opcional = (req, res, next) => {
        try {
            const decode = jwt.verify(req.body.token, process.env.SECRET);
            req.usuario = decode;
            next();
        } catch (error) {
            next();
        }
    }


    */