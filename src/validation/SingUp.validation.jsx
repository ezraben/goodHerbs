import Joi from "joi-browser";

const SingUpValidation = {
  firstName: Joi.string().min(2).max(64).required(),
  lastName: Joi.string().min(2).max(64).required(),
  email: Joi.string().min(5).max(64).email().required(),
  password: Joi.string().min(9).max(150).required(),
  confirmPassword: Joi.ref("password"),
  isAdmin: Joi.boolean().required(),
};

export default SingUpValidation;
