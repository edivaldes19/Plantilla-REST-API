const { response, request } = require('express')
const jwt = require('jsonwebtoken')
const { Usuario } = require('../models')
const validarJWT = async (req = request, res = response, next) => {
    const token = req.header('token')
    if (!token) return res.status(401).json({ msg: 'Sin autorización por ausencia de token.' })
    try {
        const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY)
        const usuario = await Usuario.findById(uid)
        if (!usuario || !usuario.estado) return res.status(401).json({ msg: 'Usuario inexistente.' })
        req.usuario = usuario
        next()
    } catch (error) {
        console.log(error)
        res.status(401).json({ msg: 'Token inválido.' })
    }
}
module.exports = { validarJWT }