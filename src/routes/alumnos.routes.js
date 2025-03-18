import express from 'express';
const router = express.Router();

// Ruta para obtener todos los alumnos
router.get('/alumnos', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM alumnos');
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Error del servidor');
  }
});

export default router;