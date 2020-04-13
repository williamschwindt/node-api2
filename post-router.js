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

router.post('/:id/comments', (req, res) => {
    let post = db.findById(req.params.id);
    if(!post) {
        return res.status(404).json({
            message: "The post with the specified ID does not exist"
        })
    }

    if(!req.body.text) {
        return res.status(400).json({
            errorMessage: "Please provide text for the comment"
        })
    }

    db.insertComment(req.body)
        .then(comment => {
            return res.status(201).json(comment)
        })
        .catch(err => {
            return res.status(500).json({
                error: "There was an error while saving the comment to the database"
            })
        })
})

module.exports = router;