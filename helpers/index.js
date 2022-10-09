const dbValidators = require('./db-validators')
const generarJWT = require('./generarJWT')
const googleVerify = require('./google-verify')
module.exports = { ...dbValidators, ...generarJWT, ...googleVerify }