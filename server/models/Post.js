const mongoose = require('mongoose');
//
const PostSchema = mongoose.Schema({
    title: String,
    groups: [],
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
    groupSchedule: [{
        group: String,
        teams: [],
    }],
    matches: [{
        teams: Array,
        result: Array,
        matchId: String,
    }],
});

module.exports = mongoose.model('Posts', PostSchema);