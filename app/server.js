const express = require('express');

const app = express();
const PORT = 3000;

app.use(express.json());

let tasks = [
    { id: 1, title: 'Learn Docker', completed: false },
    { id: 2, title: 'Learn DevOps', completed: false }
];

app.get('/', (req, res) => {
    res.send('Task Tracker API is running!');
});

app.get('/tasks', (req, res) => {
    res.json(tasks);
});

app.post('/tasks', (req, res) => {
    const task = {
        id: tasks.length + 1,
        title: req.body.title,
        completed: false
    };

    tasks.push(task);
    res.status(201).json(task);
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
});