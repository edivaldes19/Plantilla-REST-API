const { Router } = require('express')
const { check } = require('express-validator')
const { esRolValido, emailExiste, usuarioExiste } = require('../helpers/db-validators')
const { usuariosGet, usuariosDelete, usuariosPut, usuariosPost } = require('../controllers/usuarios')
const { validarCampos, validarJWT, tieneRole } = require('../middlewares')

const router = Router()
router.get('/', usuariosGet)
router.post('/', [
    check('nombre', 'El nombre es obligatorio.').not().isEmpty(),
    check('password', 'La contraseña es obligatoria y debe contener más de 6 caracteres.').isLength({ min: 6 }),
    check('correo', 'Correo electrónico inválido.').isEmail(),
    check('correo').custom(emailExiste),
    check('rol').custom(esRolValido),
    validarCampos
], usuariosPost)
router.put('/:id', [
    check('id', 'No es un id válido.').isMongoId(),
    check('id').custom(usuarioExiste),
    check('rol').custom(esRolValido),
    validarCampos,
], usuariosPut)
router.delete('/:id', [
    validarJWT,
    tieneRole('ADMIN_ROL', 'VENTAS_ROL'),
    check('id', 'No es un id válido.').isMongoId(),
    check('id').custom(usuarioExiste),
    validarCampos
], usuariosDelete)
module.exports = router