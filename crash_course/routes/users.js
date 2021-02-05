const express = require('express');
const router = express.Router();
const users = require('../Users');



router.get('/', (req, res) => {
    res.send('Hello Express');
})

router.get('/file', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'home.html'));
})

router.get('/users', (req, res) => {
    res.status(200).json(users);
})

router.get('/users/:user_id', (req, res) => {
    const found = users.some(user => user.id === parseInt(req.params.user_id));

    if(found) {
        res.status(200).json(users.filter(user => user.id === parseInt(req.params.user_id)));
    }
    else {
        res.status(400).json({msg: `User not found with id = ${req.params.user_id}`});
    }
})

module.exports = router;