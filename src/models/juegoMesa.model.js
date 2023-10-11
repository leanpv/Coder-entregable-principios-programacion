import mongoose from "mongoose";

const juegoEnMesaSchema = new mongoose.Schema({
  mesaId: {
    type: mongoose.Schema.Types.ObjectId,
    reference: "mesa",
    require: true,
  },
  userId: {
    type: String,
    reference: " user",
    require: true,
  },
  jugada: {
    type: String,
    require: true,
  },
  fecha: {
    type: String,
    require: Date.now,
  },
});
const modelJuegoMesa = mongoose.model("modelJuegoMesa", juegoEnMesaSchema);
export default modelJuegoMesa;
