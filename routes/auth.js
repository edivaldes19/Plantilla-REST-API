const { Router } = require('express')
const { check } = require('express-validator')
const { validarCampos, validarJWT } = require('../middlewares')
const { login, googleSignIn, renovarToken } = require('../controllers')
const router = Router()
router.post('/login', [
    check('correo', 'El correo es obligatorio').isEmail(),
    check('password', 'La contraseña es obligatoria').notEmpty(),
    validarCampos
], login)
router.post('/google', [
    check('id_token', 'El id_token es necesario').notEmpty(),
    validarCampos
], googleSignIn)
router.get('/', validarJWT, renovarToken)
module.exports = router