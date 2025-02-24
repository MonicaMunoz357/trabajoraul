import pg from 'pg'

export const pool = new pg.Pool({
    user: "postgres",
    host: "localhost",
    password: "juan123",
    database: "ejemplo",
    port: "5432"
})

