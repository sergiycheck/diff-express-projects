const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const log = require("debug")("log");
const User = require("../models/user");

const { usersRoute } = require("../routes/routes.config");

exports.userSignUp = async (req, res, next) => {
  const { email, password } = req.body;

  const userWithTheSameEmailCount = await User.count({ email: email });

  if (userWithTheSameEmailCount) {
    const error = new Error(`user with the same email ${email} already exists`);
    error.status = 422;
    return next(error);
  }

  bcrypt.hash(password, 10, async (err, hash) => {
    if (err) {
      err.status = 400;
      return next(err);
    }

    const user = new User({
      _id: new mongoose.Types.ObjectId(),
      email,
      password: hash,
    });

    try {
      const createdUser = await user.save();
      log(createdUser);

      const { _id, email } = createdUser;

      res.status(201).json({
        message: "Created user successfully",
        createdUser: {
          _id,
          email,
        },
        request: {
          type: "GET",
          url: `${usersRoute}/${_id}`,
        },
      });
    } catch (error) {
      next(error);
    }
  });
};

exports.userLogin = (req, res, next) => {
  User.findOne({ email: req.body.email })
    .exec()
    .then((user) => {
      if (!user) {
        const err = new Error(` Mail not fount, user does't exist`);
        err.status = 401;
        return next(err);
      }

      bcrypt.compare(req.body.password, user.password).then((result) => {
        if (!result) {
          const err = new Error(`Auth failed. Password incorrect`);
          err.status = 401;
          return next(err);
        }
        if (result) {
          const token = jwt.sign(
            {
              email: user.email,
              userId: user._id,
            },
            process.env.JWT_KEY,
            {
              expiresIn: "1h",
            }
          );

          return res.status(200).json({
            message: "Auth successful",
            token,
          });
        }
        return next(new Error("Error occurred"));
      });
    })
    .catch((err) => next(err));
};

exports.deleteUser = (req, res, next) => {
  User.deleteOne({ _id: req.params.userId })
    .then((deleteResult) => {
      if (deleteResult.deletedCount) {
        res.status(200).json({
          message: "user was deleted",
          deleteResult,
        });
      } else {
        const error = new Error(`author with id ${authorId} was not found`);
        error.status = 400;
        next(error);
      }
    })
    .catch((err) => {
      next(error);
    });
};
