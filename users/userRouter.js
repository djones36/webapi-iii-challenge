const express = require('express');

const router = express.Router();

const db = require('./userDb')
const Posts = require('../posts/postDb')

router.use(validateUser)

router.post('/', (req, res) => {
    db.insert(req.body)
        .then(newUser => {
            console.log(newUser)
            res.status(201).json({ data: newUser })
        })
});

router.post('/:id/posts', validatePost, (req, res) => {
    const userPost = {
        user_id: req.body.user_id,
        text: req.body.text
    }
    Posts.insert(userPost)
        .then(newPost => {
            console.log(newPost)
            res.status(201).json({ data: newPost })
        })
});

router.get('/', (req, res) => {
    db.get()
        .then(users => {
            res.status(200).json({ data: users })
        })
});

router.get('/:id', validateUserId, (req, res) => {
    res.status(200).json({ user: req.user })
});

router.get('/:id/posts', validateUserId, validatePost, (req, res) => {
    db.getUserPosts(req.params.id)
        .then(userPost => {
            res.status(200).json({ data: userPost })
        })
});

router.delete('/:id', validateUserId, (req, res) => {
    db.remove(req.params.id)
        .then(deleteUser => {
            // console.log(deleteUser)
            res.status(200).json({ data: "User was deleted" })
        }).catch(err => res.status(500).json({ err: "error" }))
});

router.put('/:id', validateUserId, (req, res) => {
    db.update(req.params.id, req.body)
        .then(() => {
            res.status(200).json({ message: "The user was correctly updated" })
        }).catch(err => res.status(500).json({ message: "user unable to update" }))
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
    if (!req.body) {
        res.status(400).json({ message: "missing user data" });
    } else if (!req.body.name) {
        res.status(400).json({ message: "missing required name field" });
    }
    next();
};

function validatePost(req, res, next) {
    if (!req.body) {
        res.status(400).json({ message: "missing post data" })
    } else if (!req.body.text) {
        res.status(400).json({ message: "missing required text field" })
    } next();
};

module.exports = router;
