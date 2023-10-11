import mongoose from "mongoose";

const mesaSchema = new mongoose.Schema({
  cartasBocaArriba: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Carta',
  }],
});

const Mesa = mongoose.model('Mesa', mesaSchema);


export default Mesa

