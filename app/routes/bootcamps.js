import express from 'express';
import { createBootcamp, addUser, findById, findAll } from '../controllers/bootcamp.controller.js';
import { auth } from '../middleware/index.js';
const router = express.Router();

/* POST Creación de Bootcamp */
router.post('/', auth, (req, res) => { // Endpoint Backend para POSTMAN
  createBootcamp(req, res);
});

/* POST Creación de Bootcamp */
router.post('/addUser', auth, (req, res) => { // Endpoint Backend para POSTMAN
  addUser(req, res);
});

/* GET Mostrar Bootcamp por ID */
router.get('/:id', auth, (req, res) => { // Endpoint Backend para POSTMAN
  findById(req, res);
});

/* GET Mostrar todos los Bootcamps */
router.get('/', (req, res) => { // Endpoint Backend para POSTMAN
  findAll(req, res);
});

export default router;