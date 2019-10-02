const express = require('express');

const router = express.Router();

const db = require('./userDb')

router.use(validateUser)

router.post('/', (req, res) => {

});

router.post('/:id/posts', validatePost, (req, res) => {
    res.status(200).json({ message: "success" })
});

router.get('/', (req, res) => {

});

router.get('/:id', validateUserId, (req, res) => {
    res.status(200).json({ user: req.user })
});

router.get('/:id/posts', (req, res) => {

});

router.delete('/:id', (req, res) => {

});

router.put('/:id', (req, res) => {

});

//custom middleware

function validateUserId(req, res, next) {
    const userId = req.params.id;
    db.getById(userId).then((valUser) => {
        console.log(valUser)
        if (valUser) {
            req.user = valUser
            next()
        } else {
            res.status(400).json({ message: 'invalid user id' })
        }
    })
};

function validateUser(req, res, next) {
    !req.body || !req.body.name ? res.status(400).json({ message: 'invalid user data' }) : next()

};

function validatePost(req, res, next) {
    if ()
};

module.exports = router;
