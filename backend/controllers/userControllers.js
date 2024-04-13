import preventErr from "../utils/preventErr.js";
import AppError from "../utils/AppError.js";
import bcrypt from "bcrypt";

const getCurrentUserProfile = preventErr(async (req, res) => {
  res.status(200).json({ results: req.user });
});

const updateCurrentUserProfile = preventErr(async (req, res) => {
  if (!req.body) {
    throw new AppError("Request body is required", 400, false);
  }
  const hashedPassword = req.body.password
    ? await bcrypt.hash(req.body.password, 10)
    : req.user.password;
  req.user.username = req.body.username || req.user.username;
  req.user.password = hashedPassword;
  req.user.email = req.body.email || req.user.email;
  if (req.body.address) {
    req.user.address = req.body.address;
  }
  if (req.body.phonenumber) {
    req.user.phonenumber = req.body.phonenumber;
  }
  await req.user.save();
  res.status(200).json({
    success: true,
    message: "Updated",
    results: { ...req.user._doc, _id: null, password: null },
  });
});
const logCurrentUserOut = preventErr((req, res) => {
  res.cookie("token", "", {
    httpOnly: true,
    sameSite: "None",
    secure: true,
    maxAge: 1,
  });
  res.status(200).json({
    success: true,
    message: "Loged out",
  });
});

export { getCurrentUserProfile, updateCurrentUserProfile, logCurrentUserOut };
