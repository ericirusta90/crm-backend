import express from 'express'
import { actualizarCliente, eliminarCliente, mostrarCliente, mostrarClientes, nuevoCliente } from '../controllers/clienteController.js'
import { mostrarProducto, mostrarProductos, nuevoProducto, actualizarProducto, eliminarProducto, buscarProducto } from '../controllers/productosController.js'
import upload from '../middeware/subirImagen.js'
import { nuevoPedido, mostrarPedidos, mostrarPedido, actualizarPedido, eliminarPedido } from '../controllers/pedidosController.js'
import { registrarUsuario, autenticarUsuario } from '../controllers/usuariosController.js'
import checkAuth from '../middeware/auth.js'

const router = express.Router()


// CLIENTES -------------------------------------------------------

// agragar nuevo cliente 
router.post('/clientes',  nuevoCliente)

// obtener todos los clientes
router.get('/clientes', checkAuth, mostrarClientes)

// obtener un cliente es especifico
router.get('/clientes/:id',  mostrarCliente)

// actualizar un cliente 
router.put('/clientes/:id', actualizarCliente)

// eliminar un cliente
router.delete('/clientes/:id', eliminarCliente)




// PRODUCTOS -----------------------------------------------------

//agragar nuevo producto
router.post('/productos', upload.single('imagen'), nuevoProducto)

//obtener todos los productos
router.get('/productos', checkAuth, mostrarProductos)

// obtener un producto es especifico
router.get('/productos/:id', mostrarProducto)

// actualizar un producto
router.put('/productos/:id',  upload.single('imagen'), actualizarProducto)

// eliminar un producto
router.delete('/productos/:id', eliminarProducto)

//busqueda de producto
router.post('/productos/busqueda/:query',  buscarProducto)




// PEDIDOS -----------------------------------------------------

//agragar nuevo pedido
router.post('/pedidos/nuevo/:id', nuevoPedido)

//obtener todos los pedidos
router.get('/pedidos', checkAuth,  mostrarPedidos)

// obtener un pedido es especifico
router.get('/pedidos/:id', mostrarPedido)

// actualizar un pedido
router.put('/pedidos/:id', actualizarPedido)

// eliminar un pedido
router.delete('/pedidos/:id',  eliminarPedido)




// USUARIOS ------------------------------------------------------

router.post('/crear-cuenta', registrarUsuario)

router.post('/iniciar-sesion', autenticarUsuario)


export default router