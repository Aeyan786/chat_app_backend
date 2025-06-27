import jwt from "jsonwebtoken";

const authentication = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(400).json({
        message: "User is not authenticated, Login again",
      });
    }

    const decode = jwt.verify(token, process.env.SECRET_KEY);
    if (!decode) {
      return res.status(400).json({
        message: "Inavild token",
      });
    }
    req.id = decode.user;
    
    next();
  } catch (error) {
    console.log(error);
  }
};

export default authentication;
