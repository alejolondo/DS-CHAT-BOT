import bcryptjs from 'bcryptjs'
import Usuario from '../models/usuario.js'
import messages from '../helpers/messages.js';




export const getUsers =  async (req = request, res) => {
    try {
        const usuarios = await Usuario.find({ status: true})
    
        if( usuarios.length <= 0 ){
        return res.status(204).json(messages.userNotFound); 
        } 
   
        return res.status(200).json( { 
            usuarios
        });
     
    } catch (error) {
        return res.status(500).json(messages.userError);
      }
    }
    
  
  export const postUsers = async (req, res) => {
  
      const {nombre, email, password, restriction } = req.body;
      const usuario = new Usuario( {nombre, email, password, restriction } );
  
  
      const salt = bcryptjs.genSaltSync();
      usuario.password = bcryptjs.hashSync(password, salt);
  
      //Guardar en BD
      await usuario.save();
      
      res.status(201).json({
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
        return res.status(500).json(messages.userErrorUpdate);
      
    }
      
    }
  
  
  export const deleteUsers = async (req, res) => {
    try {
        const { id } = req.params;
    
        const usuario = await Usuario.findByIdAndUpdate(id, { status: false } );
  
        return res.status(200).json(messages.userDelete);
    } catch (error) {
        console.error(error);
        return res.status(500).json(messages.userDeleteError);
    }
    
}


   