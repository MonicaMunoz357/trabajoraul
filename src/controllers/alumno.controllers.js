import { pool } from "../db.js";
import { createAccessToken } from "../libs/jwt.js";
import bcrypt from "bcrypt";


export const getAlumnos = async(req,res) =>{
    try {
        const {rows}= await pool.query('SELECT * FROM alumnos ')
        console.log(rows)
        res.json(rows)
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "error de servidor"})
    }
};
// Buscar un alumno por ID
export const searchAlumno = async (req, res) => {
  try {
    const { id_alumno } = req.params;
    const { rows } = await pool.query("SELECT * FROM alumnos WHERE id_alumno = $1", [id_alumno]);

    if (rows.length === 0) {
      return res.status(404).json({ message: "Alumno no encontrado" });
    }
    res.json(rows[0]);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error del servidor" });
  }
};

// Crear un nuevo alumno
export const createAlumno = async (req, res) => {
  try {
    const { nombre_completo, telefono, correo, carrera, foto_perfil, password } = req.body;

    // Encriptar contraseña antes de guardarla
    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await pool.query(
      "INSERT INTO alumnos (nombre_completo, telefono, correo, carrera, foto_perfil, password) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
      [nombre_completo, telefono, correo, carrera, foto_perfil, password]
    );

    res.json(result.rows[0]);

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error del servidor" });
  }
};

// Eliminar un alumno
export const deleteAlumno = async (req, res) => {
  try {
    const { id_alumno } = req.params;
    const result = await pool.query("DELETE FROM alumnos WHERE id_alumno = $1", [id_alumno]);

    if (result.rowCount === 0) {
      return res.status(404).json({ message: "Alumno no encontrado" });
    }

    res.json({ message: "Alumno eliminado correctamente" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error del servidor" });
  }
};

// Actualizar datos de un alumno
export const updateAlumno = async (req, res) => {
  try {
    const { id_alumno } = req.params;
    const { nombre_completo, telefono, especialidad, correo, contra, foto_perfil, cv } = req.body;

    // Encriptar la nueva contraseña si se proporciona
    let hashedPassword = null;
    if (contra) {
      hashedPassword = await bcrypt.hash(contra, 10);
    }

    const { rows } = await pool.query(
      "UPDATE alumnos SET nombre_completo = $1, telefono = $2, especialidad = $3, correo = $4, password = COALESCE($5, password), foto_perfil = $6, cv = $7 WHERE id_alumno = $8 RETURNING *",
      [nombre_completo, telefono, especialidad, correo, hashedPassword, foto_perfil, cv, id_alumno]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: "Alumno no encontrado" });
    }

    res.json(rows[0]);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error del servidor" });
  }
};
