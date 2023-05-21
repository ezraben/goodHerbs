import Joi from "joi-browser";
const EditUserValidation = {
  firstName: Joi.string().min(2).max(64).required(),
  lastName: Joi.string().min(2).max(64).required(),
  email: Joi.string().min(5).max(64).email().required(),

  isAdmin: Joi.boolean().required(),
};

export default EditUserValidation;
