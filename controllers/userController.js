import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import userModel from "../models/user.js";

export const register = async (req, res) => {
  try {
    const password = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const doc = new userModel({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      dateOfBirth: req.body.dateOfBirth,
      email: req.body.email,
      passwordHash: hash,
      address: req.body.address,
      avatarUrl: req.body.avatar,
      phoneNumber: req.body.phoneNumber,
    });

    const user = await doc.save();

    const token = jwt.sign(
      {
        _id: user._id,
      },
      "secret",
      { expiresIn: "30d" }
    );

    const { passwordHash, ...userData } = user._doc;

    res.json({
      ...userData,
      token,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      massage: "Registration error",
    });
  }
};

export const login = async (req, res) => {
  try {
    const user = await userModel.findOne({ email: req.body.email });

    if (!user) {
      return res.status(404).json({
        massage: "User not found",
      });
    }
    const isValonPass = await bcrypt.compare(
      req.body.password,
      user._doc.passwordHash
    );

    if (!isValonPass) {
      return res.status(404).json({
        massage: "Wrong login or password",
      });
    }
    const token = jwt.sign(
      {
        _id: user._id,
      },
      "secret",
      { expiresIn: "30d" }
    );

    const { passwordHash, ...userData } = user._doc;

    res.json({
      ...userData,
      token,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      massage: "Authorization error",
    });
  }
};

export const getUser = async (req, res) => {
  try {
    const user = await userModel.findOne().exec();
    res.status(200).json(user);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Couldn't get users",
    });
  }
};

export const getMe = async (req, res) => {
  try {
    const user = await userModel.findById(req.userId);
    if (!user) {
      return res.status(404).json({
        massage: "User not found",
      });
    }
    const { passwordHash, ...userData } = user._doc;

    res.json({
      ...userData,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      massage: "err",
    });
  }
};