import express from 'express';
import cors from 'cors';
import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT
});

app.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()');
    res.json({ message: 'Backend fonctionne !', time: result.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).send('Erreur serveur');
  }
});
app.get('/test-db', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()'); // simple requête
    res.json({ dbStatus: 'OK', time: result.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ dbStatus: 'Erreur', error: err.message });
  }
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Serveur lancé sur le port ${PORT}`));
