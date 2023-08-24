import { User } from '../models/index.js';

export const verifyEmail = async (req, res, next) => {
    try {
        // Obtener email desde el Body
        const {email} = req.body;

        // Verificar que el email no exista en la Base de Datos
        const userExist = await User.findOne({where:{email}});
        if (userExist) {
            console.log('El Usuario con ese email ya existe');
            return res.status(400).json({err: `El Usuario con ese email ya existe`});
        };
    } catch(error) {
        console.log('Error en la solicitud',error);
        return res.status(400).json({Mensaje: 'Error en la solicitud', error});
    } 

    // Continuar con la ejecución del código
    next();
};