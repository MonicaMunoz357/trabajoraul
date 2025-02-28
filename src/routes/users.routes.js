import { Router } from "express";
import {pool} from '../db.js'
import { createAlumno, deleteAlumno, getAlumnos, searchAlumno, updateAlumno } from "../controllers/alumno.controllers.js";
import { loginUser } from "../controllers/auth.controllers.js";

const router = Router();

//Obtener lista de alumnos
router.get('/alumnos', getAlumnos);

//Buscar alumnos por ID
router.get('/alumnos/:id_alumno', searchAlumno);

router.post('/login', loginUser)
//Crear alumnos
router.post('/add_alumno', createAlumno);

//Eliminar alumnos
router.delete('/alumnos/:id_alumno', deleteAlumno);

//Actualizar alumnos
router.put('/alumnos/:id_alumno', updateAlumno);

export default router;