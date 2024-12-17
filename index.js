import express from 'express'
import dotenv from 'dotenv'
import routes from './routes/index.js'
import conectarDB from './config/db.js'
import cors from 'cors'

//crear el servidor
const app = express()
app.use(express.json())

//carpeta publica
app.use(express.static('uploads'))

app.use('/uploads', express.static('uploads'));

dotenv.config()

conectarDB()

//cors
const dominioisPermitidos= [process.env.FRONTEND_URL];

const corsOptions= {
    origin: function (origin, callback) {
        if (dominioisPermitidos.indexOf(origin) !== -1 ) {
            //el origen del request esta permitido
            callback(null, true)
        } else {
            callback(new Error('No permitido por CORS'))
        }
    }
}

app.use(cors( corsOptions ))
//app.use(cors( {origin: '*'}));


//rutas de la app
app.use('/', routes)




//puerto
const PORT = process.env.PORT || 4000
app.listen(PORT, () => {
    console.log(`Servidor funcionando en el puerto ${PORT}`);
})

