import mongoose from 'mongoose'

const UsuariosSchema = mongoose.Schema({
    email: {
        type: String,
        unique: true,
        lowercase: true,
        trim: true
    },
    nombre: {
        type: String,
        required: 'Agrega tu nombre',
        trim: true
    },
    
    password: {
        type: String,
        required: true
    },
    
})

const Usuarios = mongoose.model("Usuarios", UsuariosSchema)

export default Usuarios