import Mensaje from "../models/mensaje.js";
import Usuario from "../models/usuario.js";
import Chat from "../models/chat.js";
import { generateChatResponse } from "../utils/openai.js";



export const crearMensaje = async (req, res) => {
    try {
      const { usuario, contenido, chatId } = req.body;
  
      if (!usuario || !contenido) {
        return res.status(400).json({ error: "Usuario y contenido son obligatorios" });
      }
  
   
      const usuarioExistente = await Usuario.findById(usuario);
      if (!usuarioExistente) {
        return res.status(404).json({ error: "El usuario no existe." });
      }
  
      let chat;
  
      if ( chatId ) {
       
        chat = await Chat.findById( chatId ).populate("mensajes");
        if (!chat) {
          return res.status(404).json({ error: "La conversación no existe." });
        }
      } else {
        
        chat = new Chat({
          usuario: usuario,
          mensajes: [],
        });
      }
  
      
      const mensajeUsuario = new Mensaje({
        usuario,
        contenido,
      });
      await mensajeUsuario.save();
  
      
      const botRespuesta = await generateChatResponse([{ role: "user", content: contenido }]);
  
      
      const botUsuario = await Usuario.findOne({ email: "bot@DSIntegration.co" });
      if (!botUsuario) {
        return res.status(500).json({ error: "El usuario del bot no está configurado." });
      }
  
      
      const mensajeBot = new Mensaje({
        usuario: botUsuario._id,
        contenido: botRespuesta,
      });
      await mensajeBot.save();
  
      
      chat.mensajes.push(mensajeUsuario._id, mensajeBot._id);
      chat.updatedAt = new Date();
      await chat.save();
  
      res.status(201).json({
        message: "Mensaje guardado exitosamente.",
        conversacion: {
          id: chat._id,
          mensajes: chat.mensajes,
        },
      });
    } catch (error) {
      console.error("Error al crear el mensaje:", error);
      res.status(500).json({ error: "Error al crear el mensaje." });
    }
  };
  

  export const obtenerChats = async (req, res) => {
    try {
      const { usuarioId } = req.params;
  
  
      const usuarioExistente = await Usuario.findById(usuarioId);
      if (!usuarioExistente) {
        return res.status(404).json({ error: "El usuario no existe." });
      }
  
      
      const conversaciones = await Chat.find({ usuario: usuarioId })
        .populate({
          path: "mensajes",
          populate: { path: "usuario", select: "nombre" }, 
        })
        .sort({ updatedAt: -1 }); 
  
      res.status(200).json({
        conversaciones,
      });
    } catch (error) {
      console.error("Error al obtener conversaciones:", error);
      res.status(500).json({ error: "Error al obtener conversaciones." });
    }
  };
  
