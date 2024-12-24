import express from "express";
import {
  getSignInForm,
  getSignUpForm,
  signUpUser,
} from "../controllers/userController.js";

const router = express.Router();

router.route("/signin").get(getSignInForm).post();
router.route("/signup").get(getSignUpForm).post(signUpUser);

export default router;
