const Joi = require('joi')

const createUserValidation = Joi.object({
    name : Joi.string().required().messages({
        "any.required": "user name is required",
      }),
      email: Joi.string().email().required().messages({
        "any.required": "Email is a required field",
        "string.empty": "email can't be empty.",
        "string.email": "Invalid email format",
      }),
      password :  Joi.string().min(8).required().messages({
        "any.required": "Password is a required field",
        "string.empty": "Password can't be empty.",
        "string.min": "Password must have minimum 8 characters",
      })
    
})

const loginValidation = Joi.object({
  email: Joi.string().email().required().messages({
    "any.required": "Email is a required field",
    "string.empty": "email can't be empty.",
    "string.email": "Invalid email format",
  }),
  password :  Joi.string().min(8).required().messages({
    "any.required": "Password is a required field",
    "string.empty": "Password can't be empty.",
    "string.min": "Password must have minimum 8 characters",
  })
})

const updateUserValidation = Joi.object({
  name : Joi.string().optional().messages({
      "any.required": "user name is required",
    }),
    email: Joi.string().email().optional().messages({
      "string.empty": "email can't be empty.",
      "string.email": "Invalid email format",
    }),
    password :  Joi.string().min(8).optional().messages({
      "string.empty": "Password can't be empty.",
      "string.min": "Password must have minimum 8 characters",
    })
  
})

module.exports = {createUserValidation,loginValidation,updateUserValidation}