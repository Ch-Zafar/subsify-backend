import pkg from "pg";
const { Pool } = pkg;

 

const pool = new Pool({
    user: 'zafar',
    host: 'localhost',
    database: 'subsify',
    password: '12345',
    port: 5432
    // connectionString:process.env.DB_CONNECTION
});

export default pool;
