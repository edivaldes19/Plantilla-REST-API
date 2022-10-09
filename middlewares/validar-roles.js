const { request, response } = require("express")
const esAdminRole = (req = request, res = response, next) => {
    if (!req.usuario) return res.status(500).json({ msg: 'Token sin validación previa a validar el Rol.' })
    const { rol, nombre } = req.usuario
    if (rol !== 'ADMIN_ROL') return res.status(401).json({ msg: `${nombre} no es un administrador.` })
    next()
}
const tieneRole = (...roles) => {
    return (req = request, res = response, next) => {
        if (!req.usuario) return res.status(500).json({ msg: 'Token sin validación previa a validar el Rol.' })
        if (!roles.includes(req.usuario.rol)) return res.status(401).json({ msg: `Se requiere alguno de estos roles: ${roles} para realizar la petición.` })
        next()
    }
}
module.exports = { esAdminRole, tieneRole }