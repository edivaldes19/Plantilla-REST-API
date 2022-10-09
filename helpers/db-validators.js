const { Usuario, Categoria, Producto } = require('../models')
const Rol = require('../models/rol')
const esRolValido = async (rol = '') => {
    const existeRol = await Rol.findOne({ rol })
    if (!existeRol) throw new Error(`El rol: ${rol} es inválido.`)
}
const emailExiste = async (correo = '') => {
    const existeEmail = await Usuario.findOne({ correo })
    if (existeEmail) throw new Error(`El correo electrónico: ${correo} ya existe.`)
}
const usuarioExiste = async (id = '') => {
    const existeUsuario = await Usuario.findById(id)
    if (!existeUsuario) throw new Error(`El id: ${id} no existe.`)
}
const categoriaExiste = async (id = '') => {
    const existeCategoria = await Categoria.findById(id)
    if (!existeCategoria) throw new Error(`El id: ${id} no existe.`)
}
const productoExiste = async (id = '') => {
    const existeProducto = await Producto.findById(id)
    if (!existeProducto) throw new Error(`El id: ${id} no existe.`)
}
module.exports = { esRolValido, emailExiste, usuarioExiste, categoriaExiste, productoExiste }