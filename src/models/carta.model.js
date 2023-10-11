import mongoose from "mongoose";

const cartaSchema = new mongoose.Schema({
  palo: {
    type: String,
    enum: ["Espadas", "Bastos", "Oros", "Copas"],
    required: true,
  },
  numero: {
    type: Number,
    min: 1,
    max: 12,
    required: true,
  },
});

const Carta = mongoose.model("Carta", cartaSchema);

export default Carta;
