const { Router } = require('express')
const { check } = require('express-validator')
const { cargarArchivo, mostrarImagen, actualizarImagenCloudDinary } = require('../controllers')
const { coleccionesPermitidas } = require('../helpers')
const { validarCampos, validarJWT, validarArchivo } = require('../middlewares')
const router = Router()
router.get('/:coleccion/:id', [
    validarJWT,
    check('id', 'ID incompatible.').isMongoId(),
    check('coleccion').custom(c => coleccionesPermitidas(c, ['usuarios', 'productos'])),
    validarCampos
], mostrarImagen)
router.post('/', [
    validarArchivo,
    validarJWT
], cargarArchivo)
router.put('/:coleccion/:id', [
    validarArchivo,
    validarJWT,
    check('id', 'ID incompatible.').isMongoId(),
    check('coleccion').custom(c => coleccionesPermitidas(c, ['usuarios', 'productos'])),
    validarCampos
], actualizarImagenCloudDinary)
module.exports = router