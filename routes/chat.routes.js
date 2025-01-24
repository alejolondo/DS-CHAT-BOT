import {Router} from 'express';
import { check } from 'express-validator';
import * as chatController from '../controllers/chat.controller.js'
import { validarJWT } from '../middlewares/validar-jwt.js'
import { validarCampos } from '../middlewares/validar-campos.js';

const router = Router()

router.post('/', [validarJWT], chatController.crearMensaje);
router.get('/:usuarioId', [validarJWT], chatController.obtenerChats);




export default router;