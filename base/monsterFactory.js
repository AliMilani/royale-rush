const Goblin = require("../monsters/goblin");
const Orc = require("../monsters/orc");
const {monsters} = require("../constants/types.constant");
const { generateId } = require("../utils/id.util");

class MonsterFactory {
    constructor(match) {
        this.match = match;
    }

    createMonster(type) {
        const id = generateId();
        switch (type) {
            case monsters.GOBLIN:
                return new Goblin(id, this.match);
            case monsters.ORC:
                return new Orc(id, this.match);
            default:
                throw new Error('Invalid monster type');
        }
    }
}

module.exports = MonsterFactory;