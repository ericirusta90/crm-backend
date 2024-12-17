import mongoose from 'mongoose'

const pedidosSchema = mongoose.Schema({
  cliente: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Clientes',
    required: true 
  },
  pedido: [
    {
      producto: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Productos',
        required: true 
      },
      cantidad: { 
        type: Number, 
        required: true,
        min: 1 
      }
    }
  ],
  total: { 
    type: Number, 
    required: true
  },
  fecha: {
    type: Date,
    default: Date.now
  }
});



const Pedido = mongoose.model('Pedidos', pedidosSchema);

export default Pedido
