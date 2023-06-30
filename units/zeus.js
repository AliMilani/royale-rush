const Unit = require("../base/unit");

class Zeus extends Unit {
    constructor(id, match,type) {
        super(id, match,type);
        this.baseDamage = 50;
        this.baseAttackSpeed = 500;
        this.manaCost = 18;
        this.damagePerLevel = 30
        this.attackSpeedPerLevel = 50
    }
}

module.exports = Zeus;