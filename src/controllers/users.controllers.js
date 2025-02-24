import {pool} from '../db.js'
import {createAccessToken} from '../libs/jwt.js'
export const getUsers = async(req,res) =>{
    try {
        const {rows}= await pool.query('SELECT * FROM users')
        console.log(rows)
        res.json(rows)
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "error de senvidor"})
    }
};

export const login = async (req, res) => {
    const { email, contra } = req.body; // Email y contraseña que el usuario envía
    
    try {
        // Realizamos la consulta para buscar al usuario por su email
        const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        
        if (result.rows.length === 0) {
            return res.status(400).json({ message: "Usuario no encontrado" });
        }
        
        const userFound = result.rows[0]; // El primer usuario encontrado con ese email
        
        // Comparar las contraseñas (en este caso, sin encriptación)
        if (contra !== userFound.contra) {
            return res.status(400).json({ message: "Contraseña incorrecta" });
        }

        // Si las credenciales son correctas, generamos un token
        const token = await createAccessToken({ id: userFound.id, email: userFound.email });

        // Configuramos la cookie con el token de acceso
        res.cookie('token', token, {
            httpOnly: true,    // Hace que la cookie sea inaccesible desde JavaScript
            secure: true,      // Solo se enviará a través de HTTPS (asegúrate de tener un entorno con HTTPS)
            sameSite: 'none',  // Requiere configuraciones adecuadas para funcionar en entornos de terceros
        });

        // Respondes con los datos del usuario
        res.json({
            userId: userFound.id,
            nombre: userFound.nombre,
            email: userFound.email,
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


export const searchUsers = async(req,res) =>{
    try {
        const {userId} =req.params;
        const {rows} = await pool.query('SELECT * FROM users WHERE userId =  $1', [userId]);
        
        if (rows.length === 0){
            return res.status(404).json({message: "Usuario no encontrado"});
        }
        res.json(rows[0]);
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "error de senvidor"})
    }
};

export const createUsers = async(req,res) =>{
    try {
        const data = req.body
        console.log(data)
        const result = await pool.query('INSERT INTO users (nombre, email, contra) VALUES ($1, $2, $3)', [data.nombre, data.email, data.contra])
        res.json(result)
        console.log(result)
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "error de senvidor"})
    }
}
export const deleteUsers = async(req,res) =>{
 try {
    const {userId} =req.params;
    const {rowCount} = await pool.query('DELETE FROM users WHERE userId =  $1', [userId]);
    
    if (rowCount.length === 0){
        return res.status(404).json({message: "Usuario no encontrado"});
    }
    res.json(rowCount)
 } catch (error) {
    console.log(error);
    return res.status(500).json({message: "error de senvidor"})
 }
};

export const updateUsers = async(req,res) =>{
 try {
    const {userId} =req.params;
    const data = req.body;

    const {rows} = await pool.query('UPDATE users SET nombre = $1, email = $2, contra = $3 WHERE userId=$4 RETURNING *', [data.nombre, data.email, data.contra, userId])
    console.log(rows)
    return res.json(rows[0])
 } catch (error) {
    console.log(error);
    return res.status(500).json({message: "error de senvidor"})
 }
};

