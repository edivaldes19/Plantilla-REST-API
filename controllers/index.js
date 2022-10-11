const authController = require('./auth')
const buscarController = require('./buscar')
const categoriasController = require('./categorias')
const productosController = require('./productos')
const uploadsController = require('./uploads')
const usuariosController = require('./usuarios')
module.exports = { ...authController, ...buscarController, ...categoriasController, ...productosController, ...uploadsController, ...usuariosController }