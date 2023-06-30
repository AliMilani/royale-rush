const Match = require("../match");

class Unit { 
    /**
     * @param {Number} id
     * @param {Match} match
     */
    constructor(id, match,type) {
        this.id = id;
        this.match = match;
        this.baseDamage = 0;
        this.baseAttackSpeed = 0 // ms
        this.manaCost = 0
        this.level = 1
        this.damagePerLevel = 0
        this.attackSpeedPerLevel = 0
        this.maxLevel = 25
        this.type = type
    }

    get attackSpeed(){
        return this.baseAttackSpeed + this.attackSpeedPerLevel * (this.level - 1)
    }

    get damage() {
        return this.baseDamage + this.damagePerLevel * (this.level - 1)
    }

    start() {
        this.#startAttacking();
    }

    #startAttacking() {
        console.log(this.type,this.id, "start attacking")
        const self = this
        setInterval(function () {
            const monster = self.match.lastAliveMonster()
            if (monster) {
                self.attack(monster);
            }
        }, this.attackSpeed)
    }

    attack(monster) {
        const self = this
        const calassName = this.constructor.name

        setTimeout(function() {
            monster.giveDamage(self.damage);
            console.log(calassName,self.id,"give damage", self.damage, "to monster", monster.id)
        }, self.attackSpeed);
    }

    levelUp() {
        this.level += 1
    }
}

module.exports = Unit;