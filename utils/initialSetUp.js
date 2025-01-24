import Usuario from "../models/usuario.js";


export const createSystemUser = async () => {
    try {
      const userSystem = await Usuario.findOne({ email: "bot@DSIntegration.co" });
      if ( userSystem ) {
        return userSystem; 
      }
  
      const systemUser = new Usuario({
        nombre: "ChatBot",
        email: "bot@DSIntegration.co",
        password: "DS-Integration123", 
      });
  
      await systemUser.save();
      return systemUser; 
    } catch (error) {
      console.error("Error al crear el usuario de sistema:", error.message);
      throw error;
    }
  };