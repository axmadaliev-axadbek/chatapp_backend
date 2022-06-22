const Joi = require('joi')

const registerShchema = Joi.object({
    username : Joi.string().min(2).required(),
    email : Joi.string().pattern(new RegExp('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')).required(),
    password : Joi.string().min(8).required()
})

const loginSchema = Joi.object({
    username : Joi.string().required(),
    password : Joi.string().min(8).required()
})


module.exports = {
    registerShchema,
    loginSchema
}