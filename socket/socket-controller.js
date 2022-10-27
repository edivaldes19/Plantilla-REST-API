const { Socket } = require('socket.io')
const { comprobarJWT } = require('../helpers')
const { ChatMensajes } = require('../models')
const socketController = async (socket = new Socket(), io) => {
    const chatMensajes = new ChatMensajes()
    const usuario = await comprobarJWT(socket.handshake.headers['token'])
    if (!usuario) return socket.disconnect()
    chatMensajes.conectarUsuario(usuario)
    io.emit('usuarios-activos', chatMensajes.usuariosArr)
    socket.emit('recibir-mensajes', chatMensajes.ultimos10)
    socket.join(usuario.id)
    socket.on('disconnect', () => {
        chatMensajes.desconectarUsuario(usuario.id)
        io.emit('usuarios-activos', chatMensajes.usuariosArr)
    })
    socket.on('enviar-mensaje', ({ uid, mensaje }) => {
        const chatMensajes = new ChatMensajes()
        if (uid) socket.to(uid).emit('mensaje-privado', { de: usuario.nombre, mensaje })
        else {
            chatMensajes.enviarMensaje(usuario.id, usuario.nombre, mensaje)
            io.emit('recibir-mensajes', chatMensajes.ultimos10)
        }
    })
}
module.exports = { socketController }