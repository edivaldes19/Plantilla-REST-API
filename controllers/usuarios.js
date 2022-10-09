const { request, response } = require('express')
const bcrypt = require('bcryptjs')
const { Usuario } = require('../models')
const usuariosGet = async (req = request, res = response) => {
    const { limite = 0 } = req.query
    const query = { estado: true }
    if (limite === 0) {
        const [total, usuarios] = await Promise.all([
            Usuario.countDocuments(query),
            Usuario.find(query)
        ])
        res.json({ total, usuarios })
    } else {
        if (isNaN(limite)) res.status(400).send('El límite no es un número.')
        const usuarios = await Usuario.find(query).limit(Number(limite))
        const total = usuarios.length
        res.json({ total, usuarios })
    }
}
const usuariosPost = async (req = request, res = response) => {
    const { nombre, correo, password, rol } = req.body
    const usuario = new Usuario({ nombre, correo, password, rol })
    const salt = bcrypt.genSaltSync()
    usuario.password = bcrypt.hashSync(password, salt)
    await usuario.save()
    res.json({ usuario })
}
const usuariosPut = async (req = request, res = response) => {
    const { id } = req.params
    const { _id, password, google, correo, ...resto } = req.body
    if (password) {
        const salt = bcrypt.genSaltSync()
        resto.password = bcrypt.hashSync(password, salt)
    }
    const usuario = await Usuario.findByIdAndUpdate(id, resto)
    res.json(usuario)
}
const usuariosDelete = async (req = request, res = response) => {
    const { id } = req.params
    const usuario = await Usuario.findByIdAndUpdate(id, { estado: false })
    res.json(usuario)
}
module.exports = { usuariosGet, usuariosPost, usuariosPut, usuariosDelete }