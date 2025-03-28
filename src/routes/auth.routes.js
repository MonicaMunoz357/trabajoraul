import { Router } from "express";
import {pool} from '../db.js'
import { loginUser } from "../controllers/auth.controllers.js";

const router = Router();

//Obtener lista de usuarios
router.post('/login', loginUser );

//Buscar profesor por ID
router.get('/profesor/:id_producto', searchProfesor);

//Crear profesor
router.post('/add_profesor', createProfesor);

//Eliminar profesor
router.delete('/delete_profesor/:id_profesor', deleteProfesor);

//Actualizar profesor
router.put('/profesor/:id_profesor', updateProfesor);

export default router;