const { Schema, model } = require('mongoose')
const UsuarioSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio.']
    },
    correo: {
        type: String,
        required: [true, 'El correo electrónico es obligatorio.'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'La contraseña es obligatoria.'],
    },
    img: { type: String, },
    rol: {
        type: String,
        required: true,
        default: 'USER_ROL',
        enum: ['ADMIN_ROL', 'USER_ROL', 'VENTAS_ROL']
    },
    estado: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    }
})
UsuarioSchema.methods.toJSON = function () {
    const { __v, password, _id, ...usuario } = this.toObject()
    usuario.uid = _id
    return usuario
}
module.exports = model('Usuario', UsuarioSchema)