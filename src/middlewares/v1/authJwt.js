import jwt from "jsonwebtoken";
import config from "../../config";
import User from '../../model/v1/User';
import Role from '../../model/v1/Role';

export const verifyToken = async (req, res, next) => {
  try {
    const token = req.headers["x-access-token"];

    if (!token) return res.status(403).json(
      {
        data: null,
        status: false,
        message: "No token provided",
        count: 0
      }
    )

    const decoded = jwt.verify(token, config.SECRET);
    req.userId = decoded.id;

    const user = await User.findById(req.userId);
    if (!user) return res.status(404).json(
      {
        data: null,
        status: false,
        message: "User not found",
        count: 0
      }
    )

    next();

  } catch (error) {
    return res.status(403).json(
      {
        data: null,
        status: false,
        message: error.message,
        count: 0
      }
    )
  }
}

export const isAdmin = async (req, res, next) => {
  const user = await User.findById(req.userId);

  const roles = await Role.find({ _id: { $in: user.roles } });

  for (let i = 0; i < roles.length; i++) {
    if (roles[i].name === "Administrador") {
      next()
      return;
    }
  }

  return res.status(403).json(
    {
      data: null,
      status: false,
      message: "User not is Admin",
      count: 0
    }
  )

}