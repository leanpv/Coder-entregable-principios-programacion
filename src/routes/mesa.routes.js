import { Router } from "express";
// import mesaSocket from "../controllers/mesa.socket.js";
import Mesa from "../models/mesa.model.js";
import userModel from "../models/users.models.js";

const mesaRoutes = Router();

mesaRoutes.post("/", async (req, res) => {
    const { nombre, capacidad } = req.body;
  try {
    const nuevaMesa = new Mesa({
      nombre,
      capacidad
    });

    await nuevaMesa.save();

    const usuariosQueJugaran = ["idUsuario1", "idUsuario2", "idUsuario3"];

    for (const userId of usuariosQueJugaran) {
      const usuario = await userModel.findById(userId);

      if (usuario) {
        usuario.mesas.push(nuevaMesa);

        await usuario.save();
      }
    }

    res.json({ message: "Mesa creada con éxito." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error en el servidor." });
  }
});

mesaRoutes.post("/mesa/:id/users/:pid", async (req, res) => {
  const { id, pid } = req.params;

  try {
    
    const mesa = await Mesa.findById(id);

   
    const usuario = await userModel.findById(pid);

    if (!mesa || !usuario) {
      return res.status(404).json({ message: "Mesa o usuario no encontrado." });
    }

   
    mesa.jugadores.push(pid);

   
    await mesa.save();

    res.json({ message: "Usuario agregado a la mesa con éxito." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error en el servidor." });
  }
});


export default mesaRoutes;
