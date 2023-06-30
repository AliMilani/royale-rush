const Unit = require("../base/unit");

class Goon extends Unit {
    constructor(id, match, type) {
        super(id, match, type);
        this.baseDamage = 90;
        this.baseAttackSpeed = 1300;
        this.manaCost = 8;
        this.damagePerLevel = 10
        this.attackSpeedPerLevel = 50
    }
}

module.exports = Goon;