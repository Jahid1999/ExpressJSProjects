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

router.post('/users', (req, res) => {
    const newUser = {
        id: uuid.v4(),
        name: req.body.name,
        email: req.body.email,
    }

    if(!newUser.name || !newUser.email) {
        return res.status(400).json({ msg: "please enter name and email"});
    }
    users.push(newUser);
    res.status(200).json(newUser);

})

router.put('/users/:user_id', (req, res) => {
    const found = users.some(user => user.id === parseInt(req.params.user_id));

    if(found) {
        users.forEach( user => {
            if(user.id === parseInt(req.params.id)) {
                user.name = req.body.name ? req.body.name : user.name;
                user.email = req.body.email ? req.body.email : user.email;

                res.status(201).json({msg: "User updted successfully"});
            }
        });

    }
    else {
        res.status(400).json({msg: `User not found with id = ${req.params.user_id}`});
    }
})


module.exports = router;