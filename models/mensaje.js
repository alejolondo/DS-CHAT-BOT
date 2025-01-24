import { Schema, model } from "mongoose";


const MensajeSchema = new Schema({
    usuario:  { type: Schema.Types.ObjectId, ref: 'Usuario', required: true },
    contenido: { type: String, required: true },
    fecha: { type: Date, default: Date.now },
});

MensajeSchema.methods.toJSON = function() {
    const { __v,  _id, ...mensaje } = this.toObject();
    mensaje.uid = _id;
    return mensaje

}

export default model('Mensaje', MensajeSchema );