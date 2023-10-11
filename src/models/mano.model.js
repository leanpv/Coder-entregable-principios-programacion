import mongoose from "mongoose";
import Carta from "./carta.model.js";


const manoSchema = new mongoose.Schema({
  jugador: {
    type: String,
    required: true,
  },
  cartas: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Carta",
    },
  ],
  cerrada: {
    type: Boolean,
    default: false,
  },
});


manoSchema.methods.recogerCarta = function () {
  const nuevaCarta = new Carta();
  this.cartas.push(nuevaCarta);
};


manoSchema.methods.recogerCartaMesa = function (carta) {
  this.cartas.push(carta);
};

manoSchema.methods.cerrarMano = function () {
  if (this.cartas.length === 7) {
    // Verificar si se cumplen las condiciones para cerrar
    // implementar las reglas específicas de combinaciones aquí
    // Por ejemplo, verificar escaleras, tríos, Chinchón, etc.
    // Si se cumplen las condiciones, establecer cerrada en true
    this.cerrada = true;
  }
};


const Mano = mongoose.model("Mano", manoSchema);



export default Mano;
