import Joi from "joi-browser";

const SingUpValidation = {
  firstName: Joi.string().min(2).max(64).required(),
  lastName: Joi.string().min(2).max(64).required(),
  email: Joi.string().min(5).max(64).email().required(),
  password: Joi.string()
    .min(9)
    .max(150)
    .regex(
      new RegExp(
        "^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*() ]).{6,12}$"
      )
    )
    .required(),
  confirmPassword: Joi.string()
    .min(9)
    .max(150)
    .regex(
      new RegExp(
        "^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*() ]).{6,12}$"
      )
    )
    .required(),
  // password: Joi.string().min(9).max(150).required(),
  // confirmPassword: Joi.ref("password"),
  isAdmin: Joi.boolean().required(),
};

export default SingUpValidation;
