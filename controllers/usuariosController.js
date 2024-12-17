import Usuarios from "../models/Usuarios.js"
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

const registrarUsuario = async (req, res) => {

    const { email, password, nombre } = req.body;
    
    //leer datos dle usuario
    const usuario = new Usuarios(req.body)
    usuario.password = await bcrypt.hash(password, 12)

    try {
        await usuario.save()
        res.json({msg: 'Usuario creado correctamente'})
    } catch (error) {
        console.log(error)
        res.json({msg: 'Hubo un error'})
    }
}


const autenticarUsuario = async (req, res, next) => {
    //buscar el usuario
    const { email, password } = req.body
    const usuario =  await Usuarios.findOne({ email })

    if (!usuario) {
        await res.status(401).json({msg: 'El usuario no existe'})
        next()
    } else {
        //verificar el password
        if (!bcrypt.compareSync(password, usuario.password)) {
            await res.status(401).json({msg: 'Password incorrecto'})
            next()
        } else {
            //firmar el token
            const token = jwt.sign( {
                email : usuario.email,
                nombre: usuario.nombre,
                id : usuario._id
            },process.env.FIRMA,
            {
                expiresIn : '1h'
            })

            //retornar el Token
            res.json({token})
        }
    }
}


export {
    registrarUsuario,
    autenticarUsuario
}