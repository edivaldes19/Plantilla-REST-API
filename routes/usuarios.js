const { Router } = require('express')
const { check } = require('express-validator')
const { usuariosGet, usuariosDelete, usuariosPatch, usuariosPut, usuariosPost } = require('../controllers/usuarios')
const { esRolValido, emailExiste, usuarioExiste } = require('../helpers/db-validators')
const validarCampos = require('../middlewares/validar-campos')
const router = Router()
router.get('/', usuariosGet)
router.post('/', [
    check('nombre', 'El nombre es obligatorio.').not().isEmpty(),
    check('password', 'La contraseña es obligatoria y debe contener más de 6 caracteres.').isLength({ min: 6 }),
    check('correo', 'Correo electrónico inválido.').isEmail(),
    // check('rol', 'Rol inválido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
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
router.patch('/', usuariosPatch)
router.delete('/', usuariosDelete)
module.exports = router