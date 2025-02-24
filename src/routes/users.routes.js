import { Router } from "express";
import {pool} from '../db.js'
import { createUsers, deleteUsers, getUsers, login, searchUsers, updateUsers } from "../controllers/users.controllers.js";

const router = Router();

//Obtener lista de usuarios
router.get('/users', getUsers);

//Buscar usuario por ID
router.get('/users/:userId', searchUsers);

router.post('/login', login)
//Crear usuario
router.post('/users', createUsers);

//Eliminar usuario
router.delete('/users/:userId', deleteUsers);

//Actualizar usuario
router.put('/users/:userId', updateUsers);

export default router;