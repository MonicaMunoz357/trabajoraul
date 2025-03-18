import express from 'express';
import cors from 'cors';
import { port } from './config.js';
import profesorRoutes from './routes/profesor.routes.js';
import alumnoRoutes from './routes/users.routes.js';
import pool from './db.js';
import morgan from 'morgan';

const app = express();

// Middlewares
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));
app.use(express.json());
app.use(morgan('dev'));

// Rutas
app.use(alumnoRoutes);
app.use(profesorRoutes);

// Endpoint para guardar asistencias
app.post('/guardar-asistencias', async (req, res) => {
  const { students } = req.body;

  console.log("Datos recibidos:", students); // Depuración

  try {
    for (const student of students) {
      console.log("Actualizando alumno:", student.id, "con asistencia:", student.present); // Depuración
      await pool.query(
        'UPDATE alumnos SET asistencia = $1 WHERE id_alumno = $2',
        [student.present, student.id]
      );
    }
    res.status(200).json({ message: 'Asistencias guardadas correctamente' });
  } catch (error) {
    console.error('Error al guardar asistencias:', error);
    res.status(500).json({ message: 'Error al guardar asistencias' });
  }
});
// Iniciar el servidor
app.listen(port, () => {
  console.log('Server on port', port);
});