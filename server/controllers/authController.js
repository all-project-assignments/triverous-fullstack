const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const signup = async (req, res) => {
  const { firstName, lastName, email, password, cPassword, phone } = req.body;

  if (!firstName || !lastName || !email || !password || !cPassword || !phone) {
    return res.status(400).json({
      message: "all fields are necessary",
    });
  }
  if (password !== cPassword) {
    return res.status(400).json({
      message: "password Mismatch",
    });
  }

  try {
    const findUser = await User.findOne({ email: email });
    if (findUser) {
      return res.status(400).json({
        message: "Email already taken!",
      });
    }

    const user = new User({
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
      phone: phone,
    });


    const createdUser = await user.save();

    return res.status(200).json({
      user: createdUser,
      message: "User Created Successfully",
    });
  } catch (err) {
    return res.status(200).json({
      error: err,
    });
  }
};

const signin = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password ) {
    return res.status(400).json({
      message: "Fields can not be empty",
    });
  }

  try {
    const data = await User.findOne({ email: email });

    if (!data) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const login = await bcrypt.compare(password, data.password);
    if (login) {
      const token = jwt.sign(
        {
          _id: data._id,
          username: data.firstName + " " + data.lastName,
        },
        process.env.JWT_SECRET
      );
      const encode = jwt.verify(token, process.env.JWT_SECRET);
      return res.status(200).json({
        token: token,
        user: { ...encode, name: data.firstName + " " + data.lastName },
      });
    }
    return res.status(400).json({
      message: "Password Mismatch",
    });
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  signup,
  signin,
};