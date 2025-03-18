import express from 'express';
// import { createProfesor } from '../controllers/profesor.controllers';
import { pool } from "../db.js";
const router = express.Router();

// Ruta para obtener todos los profesores
router.get('/profesores', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM profesores');
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Error del servidor');
  }
});
// router.post('/add_profesor', createProfesor);

export default router;