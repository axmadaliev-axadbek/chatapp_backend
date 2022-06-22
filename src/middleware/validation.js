const { AuthorizationError } = require("../utils/errors.js");
const { loginSchema, registerShchema } = require("../utils/validation.js");



function validation(req, res, next) {

    try {

        if(req.url === '/login'){
            let {error} = loginSchema.validate(req.body)
            if(error) throw new AuthorizationError(401, error.message)
        } 
        if(req.url == '/register'){
            let { error } = registerShchema.validate(req.body)
            if(error) throw new AuthorizationError(401, error.message)
        }        
        next()

    } catch (error) {
        next(error)
    }

}

module.exports = validation