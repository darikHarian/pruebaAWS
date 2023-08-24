import session from 'express-session';
import dotenv from 'dotenv';
import express from 'express';
import { verifySignUp, showSessionContent, hideSessionContent } from '../middleware/index.js';
const router = express.Router();

import User from '../models/user.model.js';
import { createUser, login, findUserById } from '../controllers/user.controller.js';

dotenv.config(dotenv);

/* GET Página de inicio */
router.get('/', (req, res) => {  // Endpoint para Frontend
  res.render('index', {layout: 'main', session: req.session, title: 'Dashboard'});
});

/* GET Página de registro */
router.get('/signup', (req, res) => { // Endpoint para Frontend
  res.render('session/signup');
});

/* POST Crear Usuario */
router.post('/signup', verifySignUp, (req, res) => { // Endpoint Backend para POSTMAN y Frontend
  createUser(req, res);
});

/* GET Página de inicio de sesión */
router.get('/signin', showSessionContent, (req, res) => { // Endpoint para Frontend
  res.render('session/signin');
});

/* POST Loguear Usuario */
router.post('/signin', async (req, res) => { // Endpoint Backend para POSTMAN y Frontend
  login(req, res);
});

/* GET Pagina de confirmación de cierre de sesión */
router.get('/signout', hideSessionContent, (req, res) => { // Endpoint para Frontend
  res.render('session/signout');
});

/* GET Página donde se gestionan los Users */
router.get('/user', (req, res) => {
  res.render('users/index', {session: req.session});
});

/* GET Página donde se gestionan los Bootcamps */
router.get('/bootcamp', (req, res) => {
  res.render('bootcamps/index', {session: req.session});
});

export default router;