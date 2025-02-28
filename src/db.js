import pg from 'pg'

export const pool = new pg.Pool({
    user: "postgres",
    host: "localhost",
<<<<<<< HEAD
    password: "murcielago576",
    database: "utd",
=======
    password: "MonicaMT64",
    database: "sistemalumnos",
>>>>>>> cf15d4c (Archivo alumnos y base de datos)
    port: "5432"
})

export default pool;