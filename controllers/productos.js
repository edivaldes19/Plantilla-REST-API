const { response, request } = require("express")
const { Producto } = require('../models')
const productosGet = async (req = request, res = response) => {
    const { limite = 0 } = req.query
    const query = { estado: true }
    if (limite === 0) {
        const [total, productos] = await Promise.all([
            Producto.countDocuments(query),
            Producto.find(query).populate('usuario', 'nombre').populate('categoria', 'nombre')
        ])
        res.json({ total, productos })
    } else {
        if (isNaN(limite)) res.status(400).send('El límite no es un número.')
        const productos = await Producto.find(query).populate('usuario', 'nombre').populate('categoria', 'nombre').limit(Number(limite))
        const total = productos.length
        res.json({ total, productos })
    }
}
const productosGetByID = async (req = request, res = response) => {
    const { id } = req.params
    const producto = await Producto.findById(id).populate('usuario', 'nombre').populate('categoria', 'nombre')
    res.json(producto)
}
const productosPost = async (req = request, res = response) => {
    const { estado, usuario, ...bodyReq } = req.body
    const productoDB = await Producto.findOne({ nombre: bodyReq.nombre })
    if (productoDB) return res.status(400).json({ msg: `El producto ${nombre} ya existe.` })
    const data = {
        ...bodyReq,
        nombre: bodyReq.nombre.toUpperCase(),
        usuario: req.usuario._id,
    }
    const producto = new Producto(data)
    await producto.save()
    res.status(201).json(producto)
}
const productosPut = async (req = request, res = response) => {
    const { id } = req.params
    const { estado, usuario, ...data } = req.body
    if (data.nombre) data.nombre = data.nombre.toUpperCase()
    data.usuario = req.usuario._id
    const producto = await Producto.findByIdAndUpdate(id, data, { new: true })
    res.json(producto)
}
const productosDelete = async (req = request, res = response) => {
    const { id } = req.params
    const producto = await Producto.findByIdAndUpdate(id, { estado: false }, { new: true })
    res.json(producto)
}
module.exports = { productosGet, productosGetByID, productosPost, productosPut, productosDelete }