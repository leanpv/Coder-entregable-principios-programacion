import { Router } from "express";
import modelJuegoMesa from "../models/juegoMesa.model.js";
import socketMiddleware from "../utils/sockets.midelware.js";

const juegoMesaRouter = Router();

juegoMesaRouter.use(socketMiddleware(io));

juegoMesaRouter.post("/mesa/:id/user/:id/jugada", async () => {
  const { _id } = req.params;
  const { jugada } = req.body;
  try {
    const juego = await modelJuegoMesa.findByIdAndUpdate(_id, jugada);
    if (!juego._id) {
      res.status(401).send({ messages: "error, jugada invalida" });
    } else {
      req.io.emit("crear-jugada", { mesaId: id, jugada });
    }
    res.status(200).send({ message: `hiciste una jugada ${juego}` });
  } catch (error) {
    res.status(500).send({ error: `error interno del servidor` });
  }
});
