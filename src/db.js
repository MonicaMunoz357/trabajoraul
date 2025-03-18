import pg from 'pg'

export const pool = new pg.Pool({
    user: "postgres",
    host: "localhost",
    password: "MonicaMT64",
    database: "db",
    port: "5432"
})

export default pool;