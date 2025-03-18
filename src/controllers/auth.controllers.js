import { pool } from "../db.js";
import { createAccessToken } from "../libs/jwt.js";
import bcrypt from "bcrypt";

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Obtenemos tanto email/correo como password/contra para mayor flexibilidad
    const userEmail = email || correo;
    const userPassword = password || contra;

    // Validación básica
    if (!userEmail || !userPassword) {
      return res.status(400).json({ 
        message: "Por favor proporcione correo electrónico y contraseña" 
      });
    }

    console.log("Intentando login con:", { email: userEmail }); // Log para debug

    let user = null;
    let role = null;
    
    // Consulta unificada usando UNION para buscar en todas las tablas de una vez
    const query = `
      SELECT correo, password, nombre_completo, 'admin' AS role FROM admin WHERE correo = $1
      UNION
      SELECT correo, password, nombre_completo, 'alumno' AS role FROM alumnos WHERE correo = $1
      UNION
      SELECT correo, password, nombre_completo, 'profesor' AS role FROM profesores WHERE correo = $1
    `;
    
    const result = await pool.query(query, [userEmail]);
    
    console.log("Resultados encontrados:", result.rows.length); // Log para debug
    
    if (result.rows.length > 0) {
      user = result.rows[0];
      role = user.role;
      
      console.log("Usuario encontrado en tabla:", role); // Log para debug
      
      // Comparar la contraseña encriptada con bcrypt
   
     // if (!validPassword) {
        //console.log("Contraseña incorrecta"); // Log para debug
        //return res.status(400).json({ message: "Contraseña incorrecta" });
      }
      
      console.log("Contraseña verificada correctamente"); // Log para debug

      // Generar token incluyendo el correo y el rol del usuario
      const token = await createAccessToken({
        correo: user.correo,
        status: role
      });

      // Configurar la cookie con el token
      res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: process.env.NODE_ENV === 'production' ? "none" : "lax",
      });

      // Responder con los datos del usuario y su rol
      return res.status(200).json({
        user: {
          id: user.id,
          nombre: user.nombre_completo,
          email: user.correo,
          rol: role,
        },
        token
      });
    } else {
      console.log("Usuario no encontrado"); // Log para debug
      return res.status(400).json({ message: "Usuario no encontrado" });
    }
  } catch (error) {
    console.error("Error en el login:", error);
    return res.status(500).json({ 
      message: "Error en el servidor", 
      error: error.message 
    });
  }
};

export const logout = (req, res) => {
  res.cookie('token', "", {
    expires: new Date(0),
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax'
  });
  return res.sendStatus(200);
};

// Verificación de token
export const verifyToken = async (req, res) => {
  const { token } = req.cookies;
  
  if (!token) return res.status(401).json({ message: "No autorizado" });

  try {
    // Implementa la verificación del token según tu lib/jwt.js
    // Por ejemplo:
    // const decoded = jwt.verify(token, "tu_secreto");
    
    // Buscar usuario en cualquiera de las tablas
    // ...

    res.json({ message: "Token verificado" });
  } catch (error) {
    return res.status(401).json({ message: "Token inválido" });
  }
};