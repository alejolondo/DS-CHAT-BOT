import { Schema, model } from "mongoose";

const UsuarioSchema = new Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    email: {
        type: String,
        required: [true, 'El correo es obligatorio'],
        unique: true
    },
    password:{
        type: String,
        required:  [true, 'La contraseña es obligatoria']
    },
    status:{
        type: Boolean,
        default: true
    },
    restriction: { 
        type: Number,
        required: [true, 'La restriccion es obligatorio'],
    }
});

//Retornar uid en lugar del _id 
UsuarioSchema.methods.toJSON = function() {
    const { __v, password, _id, ...user } = this.toObject();
    user.uid = _id;
    return user

}


export default model('Usuario', UsuarioSchema );