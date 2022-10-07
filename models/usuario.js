const { Schema, model } = require('mongoose')
const UsuarioSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El Nombre es obligatorio.']
    },
    correo: {
        type: String,
        required: [true, 'El Correo Electrónico es obligatorio.'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'La Contraseña es obligatoria.']
    },
    img: { type: String },
    rol: {
        type: String,
        required: true
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
    const { __v, password, ...usuario } = this.toObject()
    return usuario
}
module.exports = model('Usuario', UsuarioSchema)