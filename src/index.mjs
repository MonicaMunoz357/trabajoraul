// index.js
import express from 'express';
import cors from 'cors';

import pool from './db.js';

const app = express();

// Middleware
const cors = require('cors');
app.use(cors());

// Ruta para obtener los alumnos
app.get('/alumnos', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM alumnos');
    res.json(result.rows); // Enviar los datos al cliente
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Error del servidor');
  }
});

// Iniciar el servidor
const PORT = 5001;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});