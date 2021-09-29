const mongoose = require('mongoose');
//
const MatchSchema = mongoose.Schema({
    groups: [{
        group: String,
        matches: [{
            score: Array,
            teams: Array,
        }]
    }],
});

module.exports = mongoose.model('Matches', MatchSchema);