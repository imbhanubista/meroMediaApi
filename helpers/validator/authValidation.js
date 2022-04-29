const joi = require("joi");

// to validate the signup
const signupValidation = joi.object({
  name: joi.string().min(5).max(25).required(),
  username: joi.string().min(5).max(15).required(),
  email: joi
    .string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .required(),
  phone: joi.string().min(10).max(10).required(),
  password: joi.string().min(6).max(18).alphanum().required(),
});

// to validate the login
const loginValidation = joi.object({
  username: joi.string().min(5).max(15).required(),
  password: joi.string().alphanum().required(),
});

// to validate the reset section
const validateReset = joi.object({
  email: joi
    .string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .required(),
  password: joi.string().min(6).max(18).alphanum().required(),
  cpassword: joi.string().min(6).max(18).alphanum().required(),
});

const validateThumb = joi.object({
  title:joi.string().required()
})

// media validator
const validateMediaUpload = joi.object({
  title: joi.string().max(100).required(),
  price:joi.number().required(),
  description: joi.string().required(),
  tag: joi.string().required()
})

module.exports = {
  signupValidation,
  loginValidation,
  validateReset,
validateThumb,
validateMediaUpload
};
