import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

export const signup = async (req, res, next) => {
  const { name, email, password } = req.body;

  if (
    !name ||
    !email ||
    !password ||
    name === "" ||
    email === "" ||
    email === ""
  ) {
    next(errorHandler(400, "All fields are required"));
  }
  const isUser = await User.findOne({email})
  if(isUser){
    return res.json("Email already registered");
  }

  const hashpassword = bcryptjs.hashSync(password, 10);
  const newUser = new User({ name, email, password: hashpassword });

  try {
    await newUser.save();
    res.json("SignUp Successfull");
  } catch (error) {
    next(error);
  }
};



export const signin = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password || email === "" || password === "") {
    next(errorHandler(400, "All fields are required"));
  }

  try {
    const validUser = await User.findOne({ email });
    if (!validUser) {
      return next(errorHandler(404, "User not found"));
    }
    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) {
      return next(errorHandler(400, "Invalid Password"));
    }

    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
    const {password: pass, ...rest} = validUser._doc
    res
      .status(200)
      .json(rest, 'token', token)
      // .send(rest, 'token', token )
      // res.status(201).send({ msg: "Login Successfull", token: token });
  } catch (error) {
    next(error);
  }
};
