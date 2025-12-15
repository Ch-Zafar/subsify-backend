import dotenv from 'dotenv'
dotenv.config();
import cookieParser from "cookie-parser";
import cors from 'cors';``
import express from 'express';
import pool from './db/connection.js';
import userRouter from './routes/auth.routes.js';
import signalRouter from './routes/signal.routes.js';
import "./cron/cronSignal.js";





const app = express();
const port = 3000;




//for cookies
app.use(cookieParser());
// Test DB Connection
async function testDBConnection() {
    try {
        const result = await pool.query('SELECT NOW()');
        console.log('Database connected:', result.rows[0]);
    } catch (err) {
        console.error('Database connection error:', err);
    }
}

testDBConnection();

///cors


app.use(cors({
    origin:'http://localhost:5173',
    credentials:true
}))

// Middleware
app.use(express.json());

// Routes
app.use('/auth', userRouter);
app.use('/signal',signalRouter);

// Start the server
app.listen(port, () => {
    // console.log(process.env.DATABASE_URL)

    console.log(`Server is running at http://localhost:${port}`);
});
