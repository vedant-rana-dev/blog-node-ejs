import { signupUserValidate } from "../utils/modeValidations/userSchemaValidations.js";
import User from "../models/user.js";

export const getSignInForm = (req, res, next) => {
  return res.render("signin");
};

export const getSignUpForm = (req, res, next) => {
  return res.render("signup", { errors: null, values: null });
};

export const signUpUser = async (req, res, next) => {
  const { error } = signupUserValidate.validate(req.body, {
    abortEarly: false,
  });

  if (error) {
    req.session.message = "This is a warning message!";
    req.session.messageType = "warning";
    // const errors = error.details.map((err) => err.message);
    return res.render("signup", { errors: null, values: req.body });
  }

  const { name, email, password, confirmPassword } = req.body;

  const isUserAlreadyExist = await User.findOne({ email: email });

  if (isUserAlreadyExist) {
    return res.redirect("/user/signup");
  }

  return res.redirect("/");
};
