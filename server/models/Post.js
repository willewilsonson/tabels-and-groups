const mongoose = require('mongoose');
//
const PostSchema = mongoose.Schema({
    title: String,
    groups: Array,
    teams: [{
        teamName: String,
        playedGames: Number,
        wins: Number,
        draws: Number,
        losses: Number,
        scoredGoals: Number,
        concededGoals: Number,
        goalDifference: Number,
        points: Number,
        group: String,
    }],
    matches: Array,
});

module.exports = mongoose.model('Posts', PostSchema);