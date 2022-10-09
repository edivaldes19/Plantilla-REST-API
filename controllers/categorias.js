const { response } = require("express")
const { Categoria } = require('../models')

const categoriasGet = async (req = request, res = response) => {
    const { limite = 0 } = req.query
    const query = { estado: true }
    if (limite === 0) {
        const [total, categorias] = await Promise.all([
            Categoria.countDocuments(query),
            Categoria.find(query).populate('usuario', 'nombre')
        ])
        res.json({ total, categorias })
    } else {
        if (isNaN(limite)) res.status(400).send('El límite no es un número.')
        const categorias = await Categoria.find(query).populate('usuario', 'nombre').limit(Number(limite))
        const total = categorias.length
        res.json({ total, categorias })
    }
}
const categoriasGetByID = async (req, res = response) => {
    const { id } = req.params
    const categoria = await Categoria.findById(id).populate('usuario', 'nombre')
    res.json(categoria)
}
const categoriasPost = async (req, res = response) => {
    const nombre = req.body.nombre.toUpperCase()
    const categoriaDB = await Categoria.findOne({ nombre })
    if (categoriaDB) return res.status(400).json({ msg: `La categoría ${nombre} ya existe.` })
    const data = {
        nombre,
        usuario: req.usuario._id
    }
    const categoria = new Categoria(data)
    await categoria.save()
    res.status(201).json(categoria)
}
const categoriasPut = async (req, res = response) => {
    const { id } = req.params
    const { estado, usuario, ...data } = req.body
    data.nombre = data.nombre.toUpperCase()
    data.usuario = req.usuario._id
    const categoria = await Categoria.findByIdAndUpdate(id, data, { new: true })
    res.json(categoria)
}
const categoriasDelete = async (req, res = response) => {
    const { id } = req.params
    const categoria = await Categoria.findByIdAndUpdate(id, { estado: false }, { new: true })
    res.json(categoria)
}
module.exports = { categoriasGet, categoriasGetByID, categoriasPost, categoriasPut, categoriasDelete }