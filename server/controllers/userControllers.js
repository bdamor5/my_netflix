const asyncHandler = require("../middlewares/asyncErrorMiddleware");
const ErrorHandler = require("../utils/errorHandler");
const User = require("../models/userSchema");
const bcrypt = require("bcryptjs");
const cloudinary = require("cloudinary");

//register user
exports.registerUser = asyncHandler(async (req, res, next) => {
  const user = new User(req.body);

  await user.save();

  const token = user.generateToken();

  res.cookie("loginToken", token, {
    httpOnly: true,
    expires: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), //5 days to ms
  });

  res.status(201).json({ success: true, user, token });
});

//login user
exports.loginUser = asyncHandler(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email }).select(
    "+password"
  );

  if (!user) return next(new ErrorHandler("Invalid Login Details", 404));

  const password = await bcrypt.compare(req.body.password, user.password);

  if (!password) return next(new ErrorHandler("Invalid Login Details", 404));

  const token = user.generateToken();

  res.cookie("loginToken", token, {
    httpOnly: true,
    expires: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), //5 days to ms
  });

  res
    .status(200)
    .json({ success: true, message: "User Logged In", user, token });
});

//logout user
exports.logoutUser = asyncHandler(async (req, res, next) => {
  res.clearCookie("loginToken", { path: "/" });

  res.status(200).json({ success: true, message: "User Logged Out!" });
});

//logged in user info
exports.loggedInUser = asyncHandler(async (req, res, next) => {
  res.status(200).json({ user: req.user });
});

//update user
exports.updateUser = asyncHandler(async (req, res, next) => {
  const newData = {
    username: req.body.username,
    email: req.body.email,
  };

  if (req.body.profilePic !== "") {
    const user = await User.findById(req.user.id);

    await cloudinary.v2.uploader.destroy(user.profilePic.public_id);

    const myCloud = await cloudinary.v2.uploader.upload(req.body.profilePic, {
      folder: "netflix_clone",
      width: 150,
      crop: "scale",
    });

    newData.profilePic = {
      public_id: myCloud.public_id,
      url: myCloud.secure_url,
    };
  }

  const user = await User.findByIdAndUpdate(req.user.id, newData, {
    new: true,
  });

  res.status(200).json({ success: true, user,message:"User Edited" });
});

//reset pw
exports.resetPw = asyncHandler(async (req,res,next) =>{
    const user = await User.findById(req.user.id);

    user.password = req.body.newpassword

    await user.save();

    res.status(200).json({success:true})

})

//delete user
exports.deleteUser = asyncHandler(async (req, res, next) => {
  const user = await User.findByIdAndDelete(req.user.id);

  if (!user) return next(new ErrorHandler("User Not found", 400));

  res.status(200).json({ success: true, message: "Profile deleted" });
});

/////////admin///////////
//all users
exports.allUsers = asyncHandler(async (req, res, next) => {
  //if there's a query to get latest/new users
  const query = req.query.new;

  //if there was a query to fecth new users , we will only send last 10 users which are the latest ones to be added in the DB
  const user = query
    ? await User.find().limit(10).sort({ _id: -1 })
    : await User.find();

  res.status(200).json(user);
});

//single user by id
exports.singleUser = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) return next(new ErrorHandler("User Not found", 400));

  res.status(200).json({ success: true, user });
});

//delete user by id
exports.deleteUserById = asyncHandler(async (req, res, next) => {
  const user = await User.findByIdAndDelete(req.params.id);

  if (!user) return next(new ErrorHandler("User Not found", 400));

  res.status(200).json({ success: true, message: "Profile deleted" });
});

//total users per month
exports.userStats = asyncHandler(async (req, res, next) => {
  const today = new Date();
  const lastYear = today.setFullYear(today.setFullYear() - 1);

  const monthsArray = [
    "January",
    " February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const data = await User.aggregate([
    {
      $project: {
        month: { $month: "$createdAt" },
      },
    },
    {
      $group: {
        _id: "$month",
        total: { $sum: 1 },
      },
    },
  ]);

  res.status(200).json(data);
});
