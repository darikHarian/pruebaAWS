import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next, err) => {
    // Obtener Token guardado desde localStorage
    const {token} = req.headers;

    // Verificar que el Usuario esté logueado
    let decoded;
    try {
        decoded = jwt.verify(token, process.env.SECRET_KEY);
    } catch(error) {
        console.log('Error en la decodificación', error);
        return res.status(401).json({Mensaje: 'Error en la decodificación', error});
    }

    // Verificar que el Token no haya expirado
    const currentDate = (new Date() / 1000);
    if (currentDate > decoded.exp) {
        console.log({currentDate}, {exp: decoded.exp});
        return res.status(401).json({Mensaje: 'Token expirado', err});
    };

    // Guardar el Usuario en el objeto Request
    req.data = decoded.data;

    // Continuar con la ejecución del código
    next();
};

export const showContent = (req, res, next) => {
    req.session.isLoggedIn = true;
    next();
};

export const hideContent = (req, res, next) => {
    req.session.isLoggedIn = false;
    next();
};