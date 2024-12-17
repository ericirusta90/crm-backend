import Pedidos from "../models/Pedidos.js";


//agrega un nuevo pedido
const nuevoPedido = async (req, res, next) => {

    const pedido = new Pedidos(req.body);

    try {
        await pedido.save()

        res.status(201).json({
            msg: 'Se agrego un nuevo pedido'
        })

    } catch (error) {
        res.status(500).json({ msg: 'Hubo un error al cargar el pedido' });
        console.log(error);
        next()
    }
}


// mostrar todos los pedidos
const mostrarPedidos = async (req, res, next) => {

    try {
        const pedidos = await Pedidos.find({}).populate('cliente').populate({
            path: 'pedido.producto',
            model: 'Productos'
        })
        res.status(200).json(pedidos)
           
    } catch (error) {
        console.log(error); 
        res.status(500).json({ msg: 'Hubo un error al obtener los pedidos' });
        next()
    }
}



// mostrar un pedido por su id
const mostrarPedido = async (req, res, next) => {
    const { id } = req.params

    try {
        const pedido = await Pedidos.findById(id).populate('cliente').populate({
            path: 'pedido.productos',
            model: 'Productos'
        })

        if (!pedido) {
            res.status(404).json({ msg: 'El pedido no existe'})
            return next()
        }
        //mostrar pedido
        res.status(200).json(pedido)    
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Hubo un error al mostrar el pedido' });
        next()
    }
}



// actualizar un pedido 
const actualizarPedido = async (req, res, next) => {
    const { id } = req.params

    try {
        const pedido = await Pedidos.findByIdAndUpdate( { _id : id}, req.body, { new: true }).populate('cliente').populate({
            path: 'pedido.productos',
            model: 'Productos'
        })

        if (!pedido) {
            res.status(404).json({ msg: 'El pedido no existe'})
            return next()
        }
        //mostrar pedido
        res.status(200).json(pedido)    
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Hubo un error al actualizar el pedido' });
        next()
    }
}


// eliminar pedido
const eliminarPedido = async (req, res, next) => {
    const { id } = req.params

    try {
        const pedido = await Pedidos.findOneAndDelete( { _id : id} )

        if (!pedido) {
            res.status(404).json({ msg: 'El pedido no existe'})
            return next()
        }

        res.status(200).json({
            msg: 'El pedido se ha eliminado',
            pedido: pedido
        })    
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Hubo un error al eliminar el pedido' });
        next()
    }
}


export {
    nuevoPedido,
    mostrarPedidos,
    mostrarPedido,
    actualizarPedido,
    eliminarPedido
}