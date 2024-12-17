import mongoose from 'mongoose'

const ProductosSchema = mongoose.Schema({
    nombre: {
        type: String,
        trim: true
    },
    precio: {
        type: Number
    },
    imagen: {
        type: String
    }
})

const Productos = mongoose.model("Productos", ProductosSchema)

export default Productos