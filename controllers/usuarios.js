const { request, response } = require('express')
const msgStr = 'API - controlador'
const usuariosGet = (req = request, res = response) => {
    const { gender = 'Masculino' } = req.query
    res.json({
        msg: `get ${msgStr}`,
        gender
    })
}
const usuariosPost = (req, res = response) => {
    const { nombre } = req.body
    res.json({
        msg: `post ${msgStr}`,
        nombre
    })
}
const usuariosPut = (req, res = response) => {
    const { id } = req.params
    res.json({
        msg: `put ${msgStr}`,
        id
    })
}
const usuariosPatch = (req, res = response) => {
    res.json({ msg: `patch ${msgStr}` })
}
const usuariosDelete = (req, res = response) => {
    res.json({ msg: `delete ${msgStr}` })
}
module.exports = { usuariosGet, usuariosPost, usuariosPut, usuariosPatch, usuariosDelete }