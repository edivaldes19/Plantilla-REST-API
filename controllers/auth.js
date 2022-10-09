const { response, request } = require('express')
const bcryptjs = require('bcryptjs')
const { Usuario } = require('../models')
const { generarJWT, googleVerify } = require('../helpers')
const login = async (req = request, res = response) => {
    const { correo, password } = req.body
    try {
        const usuario = await Usuario.findOne({ correo })
        if (!usuario) return res.status(400).json({ msg: 'Correo inexistente.' })
        if (!usuario.estado) return res.status(400).json({ msg: 'Usuario eliminado.' })
        const validPassword = bcryptjs.compareSync(password, usuario.password)
        if (!validPassword) return res.status(400).json({ msg: 'Contraseña incorrecta.' })
        const token = await generarJWT(usuario.id)
        res.json({ usuario, token })
    } catch (error) {
        console.log(error)
        res.status(500).json({ msg: 'Error al iniciar sesión.' })
    }
}
const googleSignIn = async (req = request, res = response) => {
    const { id_token } = req.body
    try {
        const { correo, nombre, img } = await googleVerify(id_token)
        let usuario = await Usuario.findOne({ correo })
        if (!usuario) {
            const data = {
                nombre,
                correo,
                password: ' ',
                img,
                google: true
            }
            usuario = new Usuario(data)
            await usuario.save()
        }
        if (!usuario.estado) return res.status(401).json({ msg: 'Usuario eliminado.' })
        const token = await generarJWT(usuario.id)
        res.json({ usuario, token })
    } catch (error) {
        res.status(400).json({ msg: 'Token de Google inválido.' })
    }
}
module.exports = { login, googleSignIn }