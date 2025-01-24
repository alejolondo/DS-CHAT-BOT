import axios from "axios";
import dotenv from 'dotenv';
dotenv.config();


const openaiAPI = axios.create({
    
  baseURL: 'https://api.openai.com/v1/',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${process.env.OPEN_API_KEY}`, 
  },
});


export const generateChatResponse = async (messages) => {
  try {
    const response = await openaiAPI.post('chat/completions', {
      model: 'gpt-4o-mini', 
      messages,
      temperature: 0.7, 
    });

    return response.data.choices[0].message.content; 
  } catch (error) {
    console.log("🚀 ~ generateChatResponse ~ error:", error.response)
    throw new Error('No se pudo generar una respuesta en este momento.');
  }
};


