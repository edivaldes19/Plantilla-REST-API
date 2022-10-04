const mongoose = require('mongoose')
const dbConnection = async () => {
    try {
        await mongoose.connect(`${process.env.MONGODB_CNN}`)
        console.log('Conexión a la Base de datos exitosamente.')
    } catch (error) {
        console.log(error)
        throw new Error(`Error en la conexión a la base de datos: ${error}`)
    }
}
module.exports = { dbConnection }