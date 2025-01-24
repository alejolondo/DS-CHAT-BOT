import jwt from 'jsonwebtoken';
import Usuario from '../models/usuario.js';
import messages from '../helpers/messages.js';

export const validarJWT =  async ( req, res, next  ) => {
    const token = req.header('Authorization');
    

    if( !token ){
      return res.status(401).json({
        mensaje: 'Ningún Token fue proporcionado'
      });
    }

    try {
        const { uid } = jwt.verify( token, process.env.SECRETORPRIVATEKEY);

        const usuario = await Usuario.findById(uid);
        
        
        if (!usuario ){
          return res.status(401).json(messages.notFound);
        }

        if( !usuario.status ){
          return res.status(401).json(messages.unauthorized);
        }

        req.usuario = usuario;
    
        next(); 
    } catch (error) {
      return res.status(401).json(messages.unauthorized);
        
    }

    
}
