import { Router } from "express";
import { generateToken } from "../utils/jwt";
import passport from "passport";
const sessionRouter = Router();

sessionRouter.post(
  "/login",
  passport.authenticate("login"),
  async (req, res) => {
    try {
      if (!req.user) {
        res.status(400).send({ message: "usuario no valido" });
      }
      if (req.user.email === "admin@admin") {
        res.user.rol = "admin";
      } else {
        res.user.rol = "usuario";
      }
      req.session.user = {
        email: req.user.email,
        password: req.user.password,
        rol: req.user.rol,
      };
      const token = generateToken(req.user);
      res.cookie("jwtCookie", token, {
        maxAge: 43200000,
      });
      res.status(200).send({ payload: req.user });
    } catch (error) {
      res.status(401).send({ message: "error en interno del servidor" });
    }
  }
);
