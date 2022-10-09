const { response, request } = require('express')
const { isValidObjectId } = require('mongoose')
const { Usuario, Categoria, Producto, Role } = require('../models')
const coleccionesPermitidas = [
    'categorias',
    'productos',
    'productosPorCategoria',
    'roles',
    'usuarios'
]
const buscarCategorias = async (termino = '', res = response) => {
    const esMongoID = isValidObjectId(termino)
    if (esMongoID) {
        const categoria = await Categoria.findById(termino)
        return res.json({ results: categoria ? [categoria] : [] })
    }
    const regex = new RegExp(termino, 'i')
    const query = { nombre: regex, estado: true }
    const [number_of_results, categorias] = await Promise.all([
        Categoria.countDocuments(query),
        Categoria.find(query)
    ])
    res.json({
        results: categorias,
        number_of_results
    })
}
const buscarProductos = async (termino = '', res = response) => {
    const esMongoID = isValidObjectId(termino)
    if (esMongoID) {
        const producto = await Producto.findById(termino).populate('categoria', 'nombre')
        return res.json({ results: producto ? [producto] : [] })
    }
    const regex = new RegExp(termino, 'i')
    const query = {
        $or: [{ nombre: regex }, { descripcion: regex }],
        $and: [{ estado: true }]
    }
    const [number_of_results, productos] = await Promise.all([
        Producto.countDocuments(query),
        Producto.find(query).populate('categoria', 'nombre')
    ])
    res.json({
        results: productos,
        number_of_results
    })
}
const buscarProductosPorCategoria = async (termino = '', res = response) => {
    const esMongoID = isValidObjectId(termino)
    if (esMongoID) {
        const { _id, nombre } = await Categoria.findById(termino)
        const [numero_resultados, productos] = await Promise.all([
            Producto.countDocuments({ categoria: _id }),
            Producto.find({ categoria: _id })
        ])
        const names = productos.map(p => p.nombre)
        return res.json({
            nombre_categoria: nombre,
            productos: names,
            numero_resultados
        })
    }
    const regex = new RegExp(termino, 'i')
    const queryCategory = { nombre: regex, estado: true }
    const categorias = await Categoria.find(queryCategory)
    const results = await Promise.all(categorias.map(async (ctg) => {
        const { _id, nombre } = ctg
        const [numero_resultados, productos] = await Promise.all([
            Producto.countDocuments({ categoria: _id }),
            Producto.find({ categoria: _id })
        ])
        const names = productos.map(p => p.nombre)
        return {
            nombre_categoria: nombre,
            productos: names,
            numero_resultados
        }
    }))
    res.json({ results })
}
const buscarRoles = async (termino = '', res = response) => {
    const esMongoID = isValidObjectId(termino)
    if (esMongoID) {
        const rol = await Role.findById(termino)
        return res.json({ results: rol ? [rol] : [] })
    }
    const regex = new RegExp(termino, 'i')
    const [number_of_results, roles] = await Promise.all([
        Role.countDocuments({ rol: regex }),
        Role.find({ rol: regex })
    ])
    res.json({
        results: roles,
        number_of_results
    })
}
const buscarUsuarios = async (termino = '', res = response) => {
    const esMongoID = isValidObjectId(termino)
    if (esMongoID) {
        const usuario = await Usuario.findById(termino)
        return res.json({ results: usuario ? [usuario] : [] })
    }
    const regex = new RegExp(termino, 'i')
    const query = {
        $or: [{ nombre: regex }, { correo: regex }],
        $and: [{ estado: true }]
    }
    const [number_of_results, usuarios] = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query)
    ])
    res.json({
        results: usuarios,
        number_of_results
    })
}
const buscar = (req = request, res = response) => {
    const { coleccion, termino } = req.params
    if (!coleccionesPermitidas.includes(coleccion)) return res.status(400).json({ msg: `Las colecciones permitidas son: ${coleccionesPermitidas}` })
    switch (coleccion) {
        case 'categorias':
            buscarCategorias(termino, res)
            break
        case 'productos':
            buscarProductos(termino, res)
            break
        case 'productosPorCategoria':
            buscarProductosPorCategoria(termino, res)
            break
        case 'roles':
            buscarRoles(termino, res)
            break
        case 'usuarios':
            buscarUsuarios(termino, res)
            break
        default:
            res.status(500).json({ msg: 'Búsqueda incapaz.' })
            break;
    }
}
module.exports = { buscar }