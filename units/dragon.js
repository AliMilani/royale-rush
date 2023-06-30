const Unit = require("../base/unit");

class Dragon extends Unit {
    constructor(id, match,type) {
        super(id, match,type);
        this.baseDamage = 340;
        this.baseAttackSpeed = 5000;
        this.manaCost = 25;
        this.damagePerLevel = 50
        this.attackSpeedPerLevel = 100
    }
}

module.exports = Dragon;