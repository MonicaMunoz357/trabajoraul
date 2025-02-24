import { Router } from "express";
import {pool} from '../db.js'

const router = Router();

//Obtener lista de usuarios
router.get('/products', );

//Buscar usuario por ID
router.get('/products/:id_producto', searchUsers);

router.post('/products', login)
//Crear usuario
router.post('/products', createUsers);

//Eliminar usuario
router.delete('/products/:id_producto', deleteUsers);

//Actualizar usuario
router.put('/products/:id_producto', updateUsers);

export default router;