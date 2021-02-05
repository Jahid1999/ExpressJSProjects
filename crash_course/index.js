const express = require('express');
const path = require('path');
const users = require('./Users');


const app = express();

const logger = (req, res, next) => {
    console.log(`${req.protocol}://${req.get('host')}${req.originalUrl}}`);
    next();
};

app.use(logger);

app.get('/', (req, res) => {
    res.send('Hello Express');
})

app.get('/api/file', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'home.html'));
})

app.get('/api/users', (req, res) => {
    res.status(200).json(users);
})

app.get('/api/users/:user_id', (req, res) => {
    const found = users.some(user => user.id === parseInt(req.params.user_id));

    if(found) {
        res.status(200).json(users.filter(user => user.id === parseInt(req.params.user_id)));
    }
    else {
        res.status(400).json({msg: `User not found with id = ${req.params.user_id}`});
    }
})

const PORT = process.env.PORT || 5000;

app.listen(PORT);