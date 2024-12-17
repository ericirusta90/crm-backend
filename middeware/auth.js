import jwt from 'jsonwebtoken'

const checkAuth = async (req, res, next ) => {


    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {

        try {
            
            const token= req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, process.env.FIRMA);

            if (!decoded) { 
                throw new Error('Token no válido');
            }
            
            return next()

        } catch (error) {
            const e = new Error('Token no valido');
            return res.status(403).json({msg: e.message});
        }
        
    }
    

    else {
        const error = new Error('Token no valido o inexistente');
        return res.status(403).json({msg: error.message});
    }
    
    
}

export default checkAuth;