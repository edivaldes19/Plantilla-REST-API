const { request, response } = require('express')
const bcrypt = require('bcryptjs')
const Usuario = require('../models/usuario')

const usuariosGet = async (req = request, res = response) => {
    const { desde, limite } = req.query
    if (!isNaN(desde) && !isNaN(limite)) {
        const usuarios = await Usuario.find().skip(Number(desde)).limit(Number(limite))
        const total = await Usuario.countDocuments()
        res.json({ total, usuarios })
    }
}
const usuariosPost = async (req, res = response) => {
    const { nombre, correo, password, rol } = req.body
    const usuario = new Usuario({ nombre, correo, password, rol })
    const salt = bcrypt.genSaltSync()
    usuario.password = bcrypt.hashSync(password, salt)
    await usuario.save()
    res.json({ usuario })
}
const usuariosPut = async (req, res = response) => {
    const { id } = req.params
    const { _id, password, google, correo, ...resto } = req.body
    if (password) {
        const salt = bcrypt.genSaltSync()
        resto.password = bcrypt.hashSync(password, salt)
    }
    const usuarioDB = await Usuario.findByIdAndUpdate(id, resto)
    res.json(usuarioDB)
}
const usuariosPatch = (req, res = response) => {

}
const usuariosDelete = (req, res = response) => {

}
module.exports = { usuariosGet, usuariosPost, usuariosPut, usuariosPatch, usuariosDelete }