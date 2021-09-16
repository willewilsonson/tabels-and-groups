const express = require('express');
const Post = require('../models/Post');

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const test = await Post.find();
        res.json(test);
    } catch (err) {
        console.log(err);
    }
});

router.get('/:id', async (req, res) => {
    try {
        const test = await Post.findById(req.params.id);
        res.json(test);
    } catch (err) {
        console.log(err);
    }
});

router.post('/', async (req, res) => {
    const post = new Post({
        title: req.body.title,
        groups: req.body.groups,
        teams: req.body.teams
    })

    try {
        const savedPost = post.save()
        res.status(200).json(savedPost);
    } catch (err) {
        console.log(err);
    }
});

router.patch('/:id', async (req, res) => {
    try {
        console.log(req.body);
        const updatedPost = await Post.updateOne({ _id: req.params.id }, 
            { $set: { 
                title: req.body.title,
                groups: req.body.groups,
            },
            $push: {
                teams: req.body.teams,
            }
        })
        res.json(updatedPost)
    } catch (err) {
        console.log(err);
    }
});

// router.patch('team/:id', async (res, req) => {
//     try {
//         const newTeam = await Post.updateOne({ _id: req.params.id }, { $set: {
//             teams: req.body.teams,
//             }
//         })
//         res.json(newTeam);
//     } catch (err) {
//         console.log(err);
//     }
// })

module.exports = router;