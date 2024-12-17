import Productos from "../models/Productos.js"

//agrega un nuevo producto
const nuevoProducto = async (req, res, next) => {

    const { nombre, precio } = req.body; // Verificar si faltan datos esenciales

    if (!nombre || !precio) {
        return res.status(400).json({ msg: 'El nombre y el precio del producto son requeridos' });
    } 
    
    const producto = new Productos({ nombre, precio });

    try {

        if (req.file && req.file.filename) {
            producto.imagen = req.file.filename 
        }

        const productoGuardado = await producto.save()

        res.status(201).json({
            msg: 'Se agrego un nuevo producto',
            producto: productoGuardado
        })

    } catch (error) {
        res.status(500).json({ msg: 'Hubo un error al agregar el producto' });
        console.log(error);
        next()
    }
}


// mostrar todos los productos
const mostrarProductos = async (req, res, next) => {

    try {
        const productos = await Productos.find({})
        res.status(200).json(productos)    
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Hubo un error al mostrar los productos' });
        next()
    }
}


// mostrar un producto por su id
const mostrarProducto = async (req, res, next) => {
    const { id } = req.params

    try {
        const producto = await Productos.findById(id)

        if (!producto) {
            res.status(404).json({ msg: 'El producto no existe'})
            return next()
        }
        //mostrar producto
        res.status(200).json(producto)    
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Hubo un error al mostrar el producto' });
        next()
    }
}


// actualizar un producto 
const actualizarProducto = async (req, res, next) => {
    const { id } = req.params

    try {
        // Buscar el producto por su ID
        let producto = await Productos.findById(id);

        if (!producto) {
            res.status(404).json({ msg: 'El producto no existe'})
            return next()
        }

        // Actualizar los campos del producto
        producto.nombre = req.body.nombre || producto.nombre; 
        producto.precio = req.body.precio || producto.precio;

        // Si se subió una nueva imagen, actualizar el campo de la imagen
        if (req.file && req.file.filename) { 
            producto.imagen = req.file.filename; 
        }

        // Guardar los cambios en la base de datos 
        const productoActualizado = await producto.save();

        //mostrar cliente   
        res.status(200).json({ 
            msg: 'Producto actualizado correctamente', 
            producto: productoActualizado 
        });    
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Hubo un error al actualizar el producto' });   
        next()
    }
}


// eliminar producto por id
const eliminarProducto = async (req, res, next) => {
    const { id } = req.params

    try {
        const producto = await Productos.findOneAndDelete( { _id : id} )

        if (!producto) {
            res.status(404).json({ msg: 'El producto no existe'})
            return next()
        }

        res.status(200).json({
            msg: 'El producto se ha eliminado',
            producto: producto
        })    
    } catch (error) {
        console.log(error);
        next()
    }
}


//buscar producto
const buscarProducto = async (req, res, next) => {
    try {
        //obtener el query
        const { query } = req.params
        const producto = await Productos.find({ nombre: new RegExp(query, 'i') })
        res.json(producto)
    } catch (error) {
        console.log(error);
        next()
    }
}


export {
    nuevoProducto,
    mostrarProductos,
    mostrarProducto,
    actualizarProducto,
    eliminarProducto,
    buscarProducto
}