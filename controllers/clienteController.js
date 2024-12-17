import Clientes from "../models/Clientes.js";

//agrega un nuevo cliente
const nuevoCliente = async (req, res, next) => {

    const { nombre, apellido, empresa, email, telefono } = req.body;

    try {

        // Verificar si el email ya existe 
        const clienteExistente = await Clientes.findOne({ email }); 
        if (clienteExistente) { 
            return res.status(409).json({ msg: 'El email ya está registrado' }); 
        }

        //almacenar el registro
        const cliente = new Clientes(req.body)
        const clienteGuardado = await cliente.save()
        res.json({
            msg: 'Se agrego un nuevo cliente',
            cliente: clienteGuardado
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Hubo un error al agregar el cliente' });
        next()
    }
}


// mostrar todos los clientes
const mostrarClientes = async (req, res, next) => {

    try {
        const clientes = await Clientes.find({})
        res.json(clientes)    
    } catch (error) {
        console.log(error);
        next()
    }
}

// mostrar un cliente por su id
const mostrarCliente = async (req, res, next) => {
    const { id } = req.params

    try {
        const cliente = await Clientes.findById(id)

        if (!cliente) {
            res.status(404).json({ msg: 'El cliente no existe'})
            return next()
        }
        //mostrar cliente
        res.json(cliente)    
    } catch (error) {
        console.log(error);
        next()
    }
}


// actualizar un cliente 
const actualizarCliente = async (req, res, next) => {
    const { id } = req.params

    try {
        const cliente = await Clientes.findByIdAndUpdate( { _id : id}, req.body, { new: true })

        if (!cliente) {
            res.status(404).json({ msg: 'El cliente no existe'})
            return next()
        }
        //mostrar cliente
        res.status(200).json(cliente)    
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Hubo un error al actualiar el cliente' });
        next()
    }
}


// eliminar cliente por id
const eliminarCliente = async (req, res, next) => {
    const { id } = req.params

    try {
        const cliente = await Clientes.findOneAndDelete( { _id : id} )

        if (!cliente) {
            res.status(404).json({ msg: 'El cliente no existe'})
            return next()
        }

        res.status(200).json({
            msg: 'El cliente se ha eliminado',
            cliente: cliente
        })    
    } catch (error) {
        console.log(error);
        next()
    }
}


export {
    nuevoCliente,
    mostrarClientes,
    mostrarCliente,
    actualizarCliente,
    eliminarCliente
}