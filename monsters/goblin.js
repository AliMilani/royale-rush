const Monster = require("../base/monster");

class Goblin extends Monster {
    constructor(id, match) {
        super(id, match);
        this.health = 300;
        this.moveSpeed = 500
        this.manaOnDeath = 2;
    }
}

module.exports = Goblin;