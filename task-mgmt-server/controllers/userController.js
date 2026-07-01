const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

/* ===========================
   Register
=========================== */
const register = async (req, res) => {
  try {
    let { name, email, password, contactNumber } = req.body;

    if (!req.file) {
      return res.status(400).send({
        success: false,
        msg: "Please upload profile image",
      });
    }

    const existingUser = await User.findOne({
      where: { email },
    });

    if (existingUser) {
      return res.status(400).send({
        success: false,
        msg: "User already exists",
      });
    }

    const salt = await bcrypt.genSalt(10);
    password = await bcrypt.hash(password, salt);

    const imgPath = `/uploads/users/${req.file.filename}`;

    await User.create({
      name,
      email,
      password,
      contactNumber,
      imgPath,
    });

    res.status(201).send({
      success: true,
      msg: "Registration Successful",
    });
  } catch (err) {
    console.log(err);

    res.status(500).send({
      success: false,
      msg: "Server Error",
    });
  }
};

/* ===========================
   Login
=========================== */

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const existingUser = await User.findOne({
      where: { email },
    });

    if (!existingUser) {
      return res.status(401).send({
        success: false,
        msg: "User not found",
      });
    }

    const isMatch = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!isMatch) {
      return res.status(401).send({
        success: false,
        msg: "Invalid Password",
      });
    }

    const token = jwt.sign(
      {
        id: existingUser.id,
        role: existingUser.role,
      },
      process.env.SECRET_KEY,
      {
        expiresIn: "2h",
      }
    );

    res.send({
      success: true,
      msg: "Login Successful",
      token,
    });
  } catch (err) {
    console.log(err);

    res.status(500).send({
      success: false,
      msg: "Server Error",
    });
  }
};

/* ===========================
   Logged User
=========================== */

const getUserInfo = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id, {
      attributes: {
        exclude: ["password"],
      },
    });

    if (!user) {
      return res.status(404).send({
        success: false,
        msg: "User not found",
      });
    }

    const data = user.toJSON();

    if (data.imgPath) {
      data.imgPath = `http://localhost:7005${data.imgPath}`;
    }

    res.send({
      success: true,
      loggedUser: data,
    });
  } catch (err) {
    console.log(err);

    res.status(500).send({
      success: false,
      msg: "Server Error",
    });
  }
};

/* ===========================
   Profile
=========================== */

async function getProfile(req, res) {
  try {
    const user = await User.findByPk(req.user.id, {
      attributes: {
        exclude: ["password"],
      },
    });

    if (!user) {
      return res.status(404).send({
        success: false,
        msg: "User not found",
      });
    }

    const userData = user.toJSON();

    if (userData.imgPath) {
      userData.imgPath = `http://localhost:7005${userData.imgPath}`;
    }

    res.status(200).send({
      success: true,
      loggedUser: userData,
    });

  } catch (err) {
    console.log(err);

    res.status(500).send({
      success: false,
      msg: "Server Error",
    });
  }
}

/* ===========================
   Update Profile
=========================== */

const updateProfile = async (req, res) => {
  try {
    const { name, email, contactNumber } = req.body;

    const user = await User.findByPk(req.user.id);

    if (!user) {
      return res.status(404).send({
        success: false,
        msg: "User not found",
      });
    }

    user.name = name;
    user.email = email;
    user.contactNumber = contactNumber;

    if (req.file) {
      user.imgPath = `/uploads/users/${req.file.filename}`;
    }

    await user.save();

    res.send({
      success: true,
      msg: "Profile Updated Successfully",
    });

  } catch (err) {

    console.log(err);

    res.status(500).send({
      success: false,
      msg: "Server Error",
    });

  }
};

/* ===========================
   Change Password
=========================== */

// const changePassword = async (req, res) => {
//   try {
//     const { oldPassword, newPassword } = req.body;

//     const user = await User.findByPk(req.user.id);

//     const match = await bcrypt.compare(
//       oldPassword,
//       user.password
//     );

//     if (!match) {
//       return res.status(400).send({
//         success: false,
//         msg: "Old Password Incorrect",
//       });
//     }

//     const salt = await bcrypt.genSalt(10);

//     user.password = await bcrypt.hash(
//       newPassword,
//       salt
//     );

//     await user.save();

//     res.send({
//       success: true,
//       msg: "Password Updated Successfully",
//     });
//   } catch (err) {
//     console.log(err);

//     res.status(500).send({
//       success: false,
//       msg: "Server Error",
//     });
//   }
// };


const changePassword = async (req, res) => {

  try {

    const {
      currentPassword,
      newPassword,
    } = req.body;

    const user = await User.findByPk(req.user.id);

    if (!user) {
      return res.status(404).send({
        success: false,
        msg: "User not found",
      });
    }

    const match = await bcryptjs.compare(
      currentPassword,
      user.password
    );

    if (!match) {
      return res.status(400).send({
        success: false,
        msg: "Current Password Incorrect",
      });
    }

    const salt = await bcryptjs.genSalt(10);

    user.password = await bcryptjs.hash(
      newPassword,
      salt
    );

    await user.save();

    res.send({
      success: true,
      msg: "Password Changed Successfully",
    });

  } catch (err) {

    console.log(err);

    res.status(500).send({
      success: false,
      msg: "Server Error",
    });

  }

};


/* ===========================
   All Users
=========================== */

const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: {
        exclude: ["password"],
      },
    });

    res.send({
      success: true,
      allUsers: users,
    });
  } catch (err) {
    console.log(err);

    res.status(500).send({
      success: false,
      msg: "Server Error",
    });
  }
};

module.exports = {
  register,
  login,
  getUserInfo,
  getAllUsers,
  getProfile,
  updateProfile,
  changePassword,
};