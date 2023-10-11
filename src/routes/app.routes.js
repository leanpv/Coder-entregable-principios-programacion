import { Router } from "express";
import usersRoutes from "./users.routes.js";
import mesaRoutes from "./mesa.routes.js";
const router = Router()

router.use("/users", usersRoutes)
router.use("/mesa", mesaRoutes)
export default router

