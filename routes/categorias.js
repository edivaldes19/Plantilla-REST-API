const { Router } = require('express')
const { check } = require('express-validator')
const { categoriasGet, categoriasPost, categoriasGetByID, categoriasPut, categoriasDelete } = require('../controllers/categorias')
const { categoriaExiste } = require('../helpers/db-validators')
const { validarJWT, validarCampos, tieneRole, esAdminRole } = require('../middlewares')

const router = Router()
router.get('/', [validarJWT], categoriasGet)
router.get('/:id', [
    validarJWT,
    check('id', 'No es un id válido.').isMongoId(),
    check('id').custom(categoriaExiste),
    validarCampos
], categoriasGetByID)
router.post('/', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio.').notEmpty(),
    validarCampos
], categoriasPost)
router.put('/:id', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio.').notEmpty(),
    check('id', 'No es un id válido.').isMongoId(),
    check('id').custom(categoriaExiste),
    validarCampos,
], categoriasPut)
router.delete('/:id', [
    validarJWT,
    esAdminRole,
    check('id', 'No es un id válido.').isMongoId(),
    check('id').custom(categoriaExiste),
    validarCampos
], categoriasDelete)
module.exports = router