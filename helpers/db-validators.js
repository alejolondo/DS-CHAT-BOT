import Usuario from '../models/usuario.js'
import Mensaje from '../models/mensaje.js';

export const emailExiste = async ( email ) => {
    const existEmail =  await Usuario.findOne({ email: email })
    if(existEmail){
        throw new Error(`Email ${email} ya estpa registrado en la base de datos`);
    }
}

export const existeUsuarioPorId = async ( id ) => {
    const existUsuario =  await Usuario.findById( id )
    if( !existUsuario ){
        throw new Error(`Id ${id} No existe `);
    }
}

export const cantidadMensajes = async ( usuario ) => {

    const user = await Usuario.findOne({_id: usuario}) 
    const mensajesPermitidos = user.restriction;

    const unaHoraAntes = new Date(Date.now() - 60 * 60 * 1000); 
    const mensajesUltimaHora = await Mensaje.find({
        usuario: usuario,
        fecha: { $gte: unaHoraAntes },
    });
  
    if( mensajesUltimaHora.length >= mensajesPermitidos  ){
        throw new Error(`El usuario ha superado la cantidad de mensajes`);
    }
}

  
  
