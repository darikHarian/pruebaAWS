import express from 'express';
import { createUser, login, findAll, findUserById, updateUserById, deleteUserById } from '../controllers/user.controller.js';
import { auth, verifySignUp } from '../middleware/index.js';
const router = express.Router();

/* GET Creación de usuario */
router.post('/createUser', verifySignUp, (req, res) => { // Endpoint Backend
  createUser(req, res);
});

/* GET Inicio de sesión */
router.post('/login', (req, res) => { // Endpoint Backend
  login(req, res);
});

/* POST Leer Token */
router.get('/read', auth, (req, res) => {
  const data = req.data
  console.log(data)

  res.json(data)
});

/* GET Mostrar todos los usuarios */
router.get('/', auth, (req, res) => { // Endpoint Backend para POSTMAN
  findAll(req, res);
});

/* GET Mostrar Usuario por ID */
router.get('/:id', auth, (req, res) => { // Endpoint Backend para POSTMAN
  findUserById(req, res);
});

/* PUT Actualizar Usuario por ID */
router.put('/:id', auth, (req, res) => { // Endpoint Backend para POSTMAN
  updateUserById(req, res);
});

/* DELETE Eliminar Usuario por ID */
router.delete('/:id', auth, (req, res) => { // Endpoint Backend para POSTMAN
  deleteUserById(req, res);
});

export default router;