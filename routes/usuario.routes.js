import {Router} from 'express';
import { check } from 'express-validator';
import { emailExiste, existeUsuarioPorId } from '../helpers/db-validators.js';
import * as usuarioController from '../controllers/usuario.controller.js'
import { validarJWT } from '../middlewares/validar-jwt.js'
import { validarCampos } from '../middlewares/validar-campos.js';

const router = Router()

router.get('/', [validarJWT], usuarioController.getUsers )

router.post('/',  [
    validarJWT,
    check('password', 'Password must have 6 characters ').isLength({min: 6}),
    check('nombre', 'El nombre es un campo requerido').not().isEmpty(),
    check('email').custom( emailExiste ),
    validarCampos
    ], 
    usuarioController.postUsers);

router.put('/:id', [
    validarJWT,
    check('id', 'Id is not a Mongo Id Valid').isMongoId(),
    check('id').custom(  existeUsuarioPorId ),
    validarCampos
    ], 
    usuarioController.putUsers);

router.delete('/:id', [
    validarJWT,
    check('id', 'Id is not a Mongo Id Valid').isMongoId(),
    check('id').custom(  existeUsuarioPorId ),
    validarCampos
    ],
    usuarioController.deleteUsers)



export default router;