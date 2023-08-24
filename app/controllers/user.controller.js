import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { User, Bootcamp } from '../models/index.js';

/* Ruta para crear un nuevo Usuario */
export const createUser = async (req, res) => {
    //Recibir los parámetros del formulario
    const {firstName, lastName, email, password, passwordConfirm} = req.body;
  
    // Verificar que todos los campos hayan sido ingresados
    if (!firstName || !lastName || !email || !password || !passwordConfirm) {
        return res.status(400).json({
            err: 'Debe ingresar todos los campos'
        });
    };
    
    // Verificar que las contraseñas coincidan
    if (password != passwordConfirm) {
        return res.status(400).json({
            err: 'Las contraseñas no coinciden'
        });
    };

    // Hash de la contraseña
    const passwordEncrypt = await bcrypt.hash(password, 10);

    // Crear el usuario
    let newUser = await User.create({firstName, lastName, email, password: passwordEncrypt});
    
    // Generar un nuevo Token y enviarlo al Usuario
    const token = jwt.sign(
        {
            data: {
                id: newUser.id,
                email,
                firstName
            }
        }, process.env.SECRET_KEY, {'expiresIn':'1h'}
    );
      
    // Retornar Token al Cliente
    res.json({Mensaje: 'Usuario creado correctamente', newUser, Token: token});
};

/* Ruta para iniciar sesión */
export const login = async (req, res) => {
    // Recibir los parámetros del formulario
    const {email, password} = req.body;

    // Verificar que el Usuario exista en la Base de Datos
    const user = await User.findOne({where:{email}});
    if (!user) {
        return res.status(404).json({error: `No existe el Usuario con el email: ${email}`});
    };

    // Verificar que la contraseña es la correcta
    const password_match = await bcrypt.compare(password, user.password);
    if (!password_match) {
        return res.status(400).json({'Contraseña incorrecta': 'Inténtelo otra vez'});
    };

    // Crear Token
    const token = jwt.sign({
        data: {
            id: user.id,
            email: user.email,
            nombre: user.firstName
        }
    }, process.env.SECRET_KEY, {'expiresIn':'1h'});

    // Retornar Token al Cliente
    res.json({Mensaje: 'Usuario logueado correctamente', user, token});
};

/* Ruta para leer Token */
// export const readToken = async (req, res) => {
//     const {token} = req.body;

//     let decoded;

//     try {
//         decoded = jwt.verify(token, process.env.SECRET_KEY);
//     } catch(error) {
//         return res.status(400).json(error);
//     };

//     res.json(decoded);
// };

export const findAll = async (req, res) => {
    try {
        const users = await User.findAll({include: { model: Bootcamp, as: 'bootcamps' }});
        res.json(users);
        console.log('Usuarios y sus Bootcamps encontrados');
    } catch(error) {
        res.json({Mensaje: 'No se pudo obtener la lista de usuarios', error});
        console.log('No se pudo obtener la lista de usuarios', error);
    };
};

export const findUserById = async (req, res) => {
    try {
        const id = req.params.id;
        const user = await User.findByPk(id, {include: { model: Bootcamp, as: 'bootcamps' }});
        if (!user) {
            res.json({'Mensaje': 'El Usuario no existe'});
            console.log('El Usuario no existe');
        } else {
            res.json({'Usuario': user});
            console.log('Usuario encontrado');
        }
    } catch(error) {
        res.json({'Mensaje': 'El Usuario no pudo ser encontrado', error});
        console.log('El Usuario no pudo ser encontrado', error);
    };
};

export const updateUserById = async (req, res) => {
    try {
        const id = req.params.id;
        const firstName = req.body.firstName;
        const lastName  = req.body.lastName;
        const email = req.body.email;

        await User.update(
            {firstName, lastName, email},
            {where: {id}}
        );

        res.json({'Mensaje': 'Usuario actualizado correctamente'});
        console.log('Usuario actualizado');
    } catch(error) {
        res.json({'Mensaje': 'El usuario no pudo ser actualizado', error});
        console.log('El usuario no pudo ser actualizado', error);
    };
};

export const deleteUserById = async (req, res) => {
    try {
        const id = req.params.id;
        await User.destroy({where: {id}});
        res.json({'Mensaje': 'Usuario eliminado correctamente'});
        console.log('Usuario eliminado');
    } catch(error) {
        res.json({'Mensaje': 'No se ha podido eliminar el usuario', error});
        console.log('No se ha podido eliminar el usuario', error);
    };
};