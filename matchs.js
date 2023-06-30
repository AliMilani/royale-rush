const Match = require("./match");

class Matchs{
    constructor() {
        this.matchs = [];
    }

    startNewMatch(playersId) {
        const match = new Match(playersId);
        this.matchs.push(match);
        match.start();
        return match;
    }
}

module.exports = Matchs;