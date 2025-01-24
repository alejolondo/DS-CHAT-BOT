import { Schema, model } from "mongoose";

const ChatSchema = new Schema({
  usuario:  { type: Schema.Types.ObjectId, ref: 'Usuario', required: true },
  mensajes: [{ type: Schema.Types.ObjectId, ref: 'Mensaje', required: true },], 
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export default model('Chat', ChatSchema );


