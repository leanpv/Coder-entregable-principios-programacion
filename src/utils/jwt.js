import jwt from "jsonwebtoken";
import { authorize } from "passport";

export const generateToken = (user) => {
  const token = jwt.token({ user }, process.env.JWT_SECRET, authorize);
  return token;
};

export const authToken = (req, res, next) => {
  const headerAuth = req.headers.authorization;
  if (!headerAuth) {
    res.status(400).send({ message: "usuario no autorizado" });
    const token = authHeader.split(" ")[1];

    jwt.sign(token, "process.env.JWT_SECRET", (error, credentials) => {
      if (error) {
        return res.status(403).send({ error: "Usuario no autorizado" });
      }
      req.user = credentials.user;
      next();
    });
  }
};
