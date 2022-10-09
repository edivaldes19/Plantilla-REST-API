const { Router } = require('express')
const { check } = require('express-validator')
const { productosGet, productosPost, productosGetByID, productosPut, productosDelete } = require('../controllers')
const { productoExiste, categoriaExiste } = require('../helpers')
const { validarJWT, validarCampos, esAdminRole } = require('../middlewares')
const router = Router()
router.get('/', [validarJWT], productosGet)
router.get('/:id', [
    validarJWT,
    check('id', 'No es un id válido.').isMongoId(),
    check('id').custom(productoExiste),
    validarCampos
], productosGetByID)
router.post('/', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio.').notEmpty(),
    check('categoria', 'El id no pertenece a MongoDB.').isMongoId(),
    check('categoria').custom(categoriaExiste),
    validarCampos
], productosPost)
router.put('/:id', [
    validarJWT,
    check('id', 'No es un id válido.').isMongoId(),
    check('id').custom(productoExiste),
    validarCampos,
], productosPut)
router.delete('/:id', [
    validarJWT,
    esAdminRole,
    check('id', 'No es un id válido.').isMongoId(),
    check('id').custom(productoExiste),
    validarCampos
], productosDelete)
module.exports = router