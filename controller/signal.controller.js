import pool from "../db/connection.js";
import { fetchSignal } from "../utils/fetchSignal.js";


export const storeSignal = async () => {
    const data = await fetchSignal();

    for (const s of data.signals) {
        await pool.query(
            `
      INSERT INTO signal 
      (symbol, action, signal, price, change_24h, confidence, error, api_timestamp)
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8)
      `,
            [
                s.symbol,
                s.action || null,
                s.signal,
                s.price || null,
                s.change_24h || null,
                s.confidence || null,
                s.error || null,
                s.timestamp,
            ]
        );
    }

    console.log("✅ Signals stored successfully");
};


export const getSignal = async (req, res) => {
    try {
        var result = await pool.query(
            `
    SELECT *
    FROM signal
    WHERE signal != 'error'
    ORDER BY api_timestamp DESC
    LIMIT 50
    `
        );

    }
    catch (err) {
        res.json({ message: err.message })

    }
    finally {
        res.json(result.rows);

    }
}
