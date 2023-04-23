import Joi from "joi-browser";

const AddProductValidation = {
  productName: Joi.string().min(2).max(64).required(),
  productPrice: Joi.number().min(0).max(10000).required(),
};

export default AddProductValidation;
