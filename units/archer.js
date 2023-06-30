const Unit = require("../base/unit");

class Archer extends Unit {
    constructor(id, match,type) {
        super(id, match,type);
        this.baseDamage = 140;
        this.baseAttackSpeed = 2000;
        this.manaCost = 15;
        this.damagePerLevel = 20
        this.attackSpeedPerLevel = 100
    }
}

module.exports = Archer;