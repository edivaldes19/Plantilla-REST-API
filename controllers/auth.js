const { response } = require('express')
const bcryptjs = require('bcryptjs')
const Usuario = require('../models/usuario')
const { generarJWT } = require('../helpers/generarJWT')
const login = async (req, res = response) => {
    const { correo, password } = req.body
    try {
        const usuario = await Usuario.findOne({ correo })
        if (!usuario || !usuario.estado) return res.status(400).json({ msg: 'Correo inexistente.' })
        const validPassword = bcryptjs.compareSync(password, usuario.password)
        if (!validPassword) return res.status(400).json({ msg: 'Contraseña incorrecta.' })
        const token = await generarJWT(usuario.id)
        res.json({ usuario, token })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ msg: 'Error al iniciar sesión.' })
    }
}
module.exports = { login }