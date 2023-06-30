const Monster = require("../base/monster");

class Orc extends Monster {
    constructor(id, match) {
        super(id, match);
        this.health = 500;
        this.moveSpeed = 300
        this.manaOnDeath = 3;
    }
}

module.exports = Orc;