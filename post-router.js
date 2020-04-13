const express = require('express');
const db = require('./data/db');

const router = express.Router();

router.post('/', (req, res) => {
    if(!req.body.title || !req.body.contents) {
        return res.status(400).json({
            errorMessage: "Please provide title and contents for the post."
        })
    }

    db.insert(req.body)
        .then(post => {
            res.status(201).json(post);
        })
        .catch(err => {
            res.status(500).json({
                error: "There was an error while saving the post to the database"
            })
        })
})

module.exports = router;