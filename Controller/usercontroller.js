const UserModel = require("../Model/usermodel");
const jwt = require("jsonwebtoken");
const {
  validname,
  validEmail,
  validMobile,
  validPass,
  validTitle,
} = require("../validation/valid");
const usermodel = require("../Model/usermodel");
const { isValidObjectId } = require("mongoose");
const { use } = require("../Routes/route");

//========================================================creating-user===============================================================
let creatUser = async function (req, res) {
  try {
    let data = req.body;

    if (Object.keys(data).length == 0) {
      return res
        .status(400)
        .send({ status: false, message: "Body is empty can't craeate data" });
    }
    let newarr = ["name", "title", "email", "phone", "password"];
    for (field of newarr) {
      if (!data[field])
        return res.status(400).send({
          status: false,
          msg: `${field} is required,input valid ${field}`,
        });
    }

    data.title = data.title.trim();

    if (!data.name.trim() || validname.test(data.name)) {
      return res
        .status(400)
        .send({ status: false, message: "enter a valid name" });
    }

    if (validTitle(data.title)) {
      return res
        .status(400)
        .send({ status: false, message: "enter a valid title" });
    }

    if (!data.email.trim() || !validEmail.test(data.email.trim())) {
      return res
        .status(400)
        .send({ status: false, message: "enter a valid email" });
    }

    if (!data.phone.trim() || !validMobile.test(data.phone.trim())) {
      return res
        .status(400)
        .send({ status: false, message: "enter a valid phone No" });
    }

    if (!data.password.trim() || !validPass.test(data.password)) {
      return res.status(400).send({
        status: false,
        message:
          "Password should be in-between 8-15 characters and must contain one of 0-9,A-Z,a-z and special character",
      });
    }

    let oldUser = await UserModel.findOne({
      $or: [{ phone: data.phone }, { email: data.email }],
    });
    if (oldUser) {
      return res.status(400).send({
        status: false,
        message: "User already exist with this phone no or email Id",
      });
    }
    let user = await UserModel.create(data);
    res
      .status(201)
      .send({ status: true, msg: "User created successfully", data: user });
  } catch (err) {
    res.status(500).send({ status: false, msg: err.message });
  }
};

//=============================================================================login-user======================================================

const loginUser = async function (req, res) {
  try {
    let data = req.body;
    if (Object.keys(data).length == 0) {
      return res
        .status(400)
        .send({ status: false, message: "Body is empty can't find data" });
    }
    if (data.hasOwnProperty("email") && data.hasOwnProperty("phone")) {
      return res.status(400).send({
        status: false,
        message: "please provide any one between email and phone no",
      });
    }
    if (!data.hasOwnProperty("email")) {
      if (!data.hasOwnProperty("phone")) {
        return res.status(400).send({
          status: false,
          message: "please enter mobile no or email id to login",
        });
      }
    }
    if (!data.hasOwnProperty("password")) {
      return res
        .status(400)
        .send({ status: false, message: "please enter password to login" });
    }
    let user = await UserModel.findOne({
      $or: [
        { email: data.email, password: data.password },
        { phone: data.phone, password: data.password },
      ],
    });

    if (!user) {
      return res.status(404).send({ status: false, msg: "no user found" });
    }
    let token = jwt.sign({ ID: user._id }, "Auth-Gyan", {
      expiresIn: "10d",
    });
    res.status(200).send({ status: true, message: token });
  } catch (err) {
    res.status(500).send({ status: false, msg: err.message });
  }
};

//=============================================================================get-user======================================================
const getUser = async function (req, res) {
  try {
    // const { title } = req.query;
    // if (!title) {
      const getAllUsers = await usermodel.find();
      return res.status(200).send({ status: true, message: getAllUsers });
    // }
  } catch (err) {
    res.status(500).send({ status: false, msg: err.message });
  }
};

//=============================================================================update-user======================================================

const updateUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    if (!isValidObjectId(userId))
      return res
        .status(400)
        .send({ status: false, Msg: "Provide Valid objectId" });

    if (Object.keys(bodydata).length == 0)
      return res
        .status(400)
        .send({
          status: false,
          Msg: "Data is required to update the user Profile",
        });

    let alert = await UserModel.findOne({ _id: userId, isDeleted: true });
    if (alert)
      return res
        .status(404)
        .send({ status: False, Msg: "No User found  or Already deleted" });

    let updateUser = await UserModel.findOneAndUpdate(
      { _id: userId },
      {
        title: title,
        name: name,
        phone: phone,
        email: email,
        password: password,
      },
      { new: true }
    );
    return res
      .status(200)
      .send({
        status: true,
        Msg: "User updated Successfully",
        data: updateUser,
      });
  } catch (err) {
    return res.status(500).send({ status: false, Msg: err.message });
  }
};

module.exports = { creatUser, loginUser, getUser, updateUser };
