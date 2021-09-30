const express = require('express');
const { find, update } = require('../models/Post');
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
        const table = await Post.findById(req.params.id);
        res.json(table);
    } catch (err) {
        console.log(err);
    }
});

router.post('/', async (req, res) => {
    console.log(req.body.groups, ' grupper');
    const post = new Post({
        title: req.body.title,
        groups: req.body.groups,
        teams: req.body.teams,
        groupSchedule: req.body.groupSchedule,
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
        });
        console.log(updatedPost);
        res.json(updatedPost)
    } catch (err) {
        console.log(err);
    }
});

router.patch('/matches/:id', async (req, res) => {
    try {
        console.log(req.body.groupSchedule._id);
        const updatedPost = await Post.updateOne({ _id: req.params.id }, 
            { $set: {
                groupSchedule: req.body.groupSchedule,
            }
        })
        console.log(updatedPost);
        res.json(updatedPost);
    } catch (err) {
        console.log(err);
    }
});

router.patch('/deleteTeam/:id', async (req, res) => {
    try {
        console.log(req.body.teams);
        const table = await Post.find({ _id: req.params.id });
        const removeTeam = table[0].teams.filter((team, i) => i != req.body.teams ? team : false)
        const updatedPost = await Post.updateOne({_id: req.params.id}, 
            { $set: {
                teams: removeTeam,
            }
        })
        console.log(removeTeam);
        res.json(updatedPost);
    } catch (err) {
        console.log(err);
    }
});

router.patch('/team/:id', async (req, res) => {
    try {
        const table = await Post.find({ _id: req.params.id });
        
    } catch (err) {
        console.log(err);
    }
});

router.get('/matches/:id', (req, res) => {

});



module.exports = router;

// router.patch('/team/:id', async (req, res) => {
//     // const hitta = Post.find(req.body[0]._id);
//     try {
//         const updateTeam = async (team) => {
//             const updatedPost = await Post.updateMany({ _id: team._id }, 
//                 { $set: {
//                     teamName: team.teamName,
//                     playedGames: team.playedGames,
//                     wins: team.wins,
//                     draws: team.draws,
//                     losses: team.losses,
//                     scoredGoals: team.scoredGoals,
//                     concededGoals: team.concededGoals,
//                     goalDifference: team.goalDifference,
//                     points: team.points,
//                     group: team.group,
//                     }
//                 })
//             console.log(updatedPost);
//             res.json(updatedPost);
//         };
//         req.body.map(async (team) => await updateTeam(team))
//     } catch (err) {
//         console.log(err);
//     }
// });