const { Router } = require('express')
const { check } = require('express-validator')
const { login } = require('../controllers/auth')
const { validarCampos } = require('../middlewares')
const router = Router()

router.post('/login', [
    check('correo', 'El correo electrónico es obligatorio.').isEmail(),
    check('password', 'La contraseña es obligatoria.').not().isEmpty(),
    validarCampos
], login)
module.exports = router