import Usuario from '../models/usuario.js'


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
  
