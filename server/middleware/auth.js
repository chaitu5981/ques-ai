import jwt from "jsonwebtoken";

export const isLoggedIn = (req, res, next) => {
  const token = req.cookies.authToken;
  if (!token)
    return res.status(401).json({
      success: false,
      message: "Token not found",
    });
  const user = jwt.verify(token, process.env.JWT_SECRET_KEY);
  if (!user)
    return res.status(401).json({
      success: false,
      message: "Invalid Token",
    });
  req.user = user;
  next();
};
