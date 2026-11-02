
const express = require('express');
const { Pool } = require('pg');

const app = express();
const PORT = 3000;

app.use(express.json());

const pool = new Pool({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT || 5432),
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    ssl: process.env.DB_SSL === 'true'
        ? { rejectUnauthorized: false }
        : false,
    connectionTimeoutMillis: 5000
});

app.get('/', (req, res) => {
    res.send('Task Tracker API is running! PostgreSQL Integration Enabled!');
});

app.get('/health', (req, res) => {
    res.json({ status: 'ok' });
});

app.get('/tasks', async (req, res) => {
    try {
        const result = await pool.query(
            'SELECT id, title, completed FROM tasks ORDER BY id'
        );
        res.json(result.rows);
    } catch (error) {
        console.error('Failed to fetch tasks:', error.message);
        res.status(500).json({ error: 'Failed to fetch tasks' });
    }
});

app.post('/tasks', async (req, res) => {
    const { title } = req.body;

    if (typeof title !== 'string' || !title.trim()) {
        return res.status(400).json({ error: 'Task title is required' });
    }

    try {
        const result = await pool.query(
            'INSERT INTO tasks (title, completed) VALUES ($1, $2) RETURNING id, title, completed',
            [title.trim(), false]
        );

        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error('Failed to create task:', error.message);
        res.status(500).json({ error: 'Failed to create task' });
    }
});

async function startServer() {
    try {
        await pool.query('SELECT 1');

        console.log('PostgreSQL connection successful');

        await pool.query(`
            CREATE TABLE IF NOT EXISTS tasks (
                id SERIAL PRIMARY KEY,
                title VARCHAR(255) NOT NULL,
                completed BOOLEAN NOT NULL DEFAULT FALSE
            )
        `);

        console.log('Tasks table is ready');

        app.listen(PORT, '0.0.0.0', () => {
            console.log(`Server running on port ${PORT}`);
        });
    } catch (error) {
        console.error('PostgreSQL connection failed:', error.message);
        process.exit(1);
    }
}

startServer();
