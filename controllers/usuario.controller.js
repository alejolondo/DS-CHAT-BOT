import bcryptjs from 'bcryptjs'
import Usuario from '../models/usuario.js'




export const getUsers =  async (req = request, res) => {
    try {
        const usuarios = await Usuario.find({ status: true})
    
        if( usuarios.length <= 0 ){
        return res.status(204).json({ 
                mensaje: 'No se encontraron usuarios en la base de datos'
            }); 
        } 
   
        return res.status(200).json( { 
            usuarios
        });
     
    } catch (error) {
        console.error(error);
        return res.status(500).json({
          mensaje: 'Hubo un error al obtener los usuarios'
        });
      }
    }
    
  
  export const postUsers = async (req, res) => {
  
      const {nombre, email, password } = req.body;
      const usuario = new Usuario( {nombre, email, password } );
  
  
      const salt = bcryptjs.genSaltSync();
      usuario.password = bcryptjs.hashSync(password, salt);
  
      //Guardar en BD
      await usuario.save();
      
      res.status(201).json({
          msg: 'Usuario creado éxitosamente',
          usuario
      })
    }   
  
 export  const putUsers = async (req, res) => {
    try {
        const id = req.params.id
        const { _id, password, ...resto } = req.body;
    
    
    
        if( password ) {
          const salt = bcryptjs.genSaltSync();
          resto.password = bcryptjs.hashSync(password, salt);
        }
    
        const usuario = await Usuario.findByIdAndUpdate( id, resto )
        
        
        return  res.status(200).json({ usuario }) 
    } catch (error) {
        console.error(error);
        return res.status(500).json({
          mensaje: 'Hubo un error al actualizar los datos del usuario'
        });
      
    }
      
    }
  
  
  export const deleteUsers = async (req, res) => {
    try {
        const { id } = req.params;
    
        const usuario = await Usuario.findByIdAndUpdate(id, { status: false } );
  
        return res.status(200).json( {mensaje: 'Usuario deshabilitado exitosamente'} );
    } catch (error) {
        console.error(error);
        return res.status(500).json({
          mensaje: 'Hubo un error deshabilitar el usuario'
        });
    }
    
}


   