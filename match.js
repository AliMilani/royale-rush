const MonsterFactory = require("./base/monsterFactory");
const { monsters: monsterTypes } = require("./constants/types.constant");
const Player = require("./player");
const { generateId } = require("./utils/id.util");

class Match {
  constructor(playerId) {
    this.id = generateId();
    this.player = new Player(playerId, this);
    this.units = [];
    /**
     * @type {import("./base/monster")[]} monsters
     */
    this.monsters = [];
    this.monsterAddTimes = {
      1400: {
        type: monsterTypes.GOBLIN,
        count: 3,
      },
      2000: {
        type: monsterTypes.ORC,
        count: 2,
      },
      2001: {
        type: monsterTypes.GOBLIN,
        count: 3,
      },
      9000: {
        type: monsterTypes.ORC,
        count: 2,
      },
      
      19000: {
        type: monsterTypes.GOBLIN,
        count: 8
      }
    };
    this.mapLength = 100000;
    this.startTime = 0;
    this.isEnded = false;
  }

  start() {
    this.startTime = Date.now();
    this.#loadMonsters();
    this.player.start();
    console.log("match started");
  }

  requestUnit(player, unit) {
    if (player.mana < unit.manaCost) throw new Error("Not enough mana");
    player.mana -= unit.manaCost;
    this.#addUnit(unit);
      unit.start();
  }

  #addUnit(unit) {
    this.units.push(unit);
  }

  mergeUnit(newUnitId, oldUnitId) {
    const newUnit = this.units.find((unit) => unit.id === newUnitId);
    const oldUnit = this.units.find((unit) => unit.id === oldUnitId);

    if (!newUnit || !oldUnit) throw new Error("One of the units not found");

    if (newUnit.constructor.name !== oldUnit.constructor.name)
      throw new Error("Units must be the same type");

    if (newUnit.level !== oldUnit.level)
      throw new Error("Units must be the same level");
    
    const maxLevel = newUnit.maxLevel;
    if (newUnit.level === maxLevel) throw new Error("Units already max level");

    this.removeUnit(oldUnit);
    newUnit.levelUp();
  }

  removeUnit(unit) {
    this.units = this.units.filter((u) => u.id !== unit.id);
  }

  #loadMonsters() {
    if (this.startTime === 0) throw new Error("Match not started yet");
    const currentTime = Date.now() - this.startTime;
    const maxBufferTime = 100; // ms
    if (currentTime > maxBufferTime)
      throw new Error("loading monsters too late");
    Object.entries(this.monsterAddTimes).forEach(([time, { count, type }]) => {
      Array(count)
        .fill()
        .forEach(() => {
          setTimeout(() => {
            const monsterFactory = new MonsterFactory(this);
            const monster = monsterFactory.createMonster(type);
            monster.start();
            this.#addMonster(monster);
            console.log("monster added", {
              type,
              time: Date.now() - this.startTime,
            });
          }, time);
        });
    });
  }

  #addMonster(monster) {
    this.monsters.push(monster);
  }

  currentAliveMonsters() {
    const aliveMonsters = this.monsters.filter((monster) => monster.isActive())
    console.log("total alive monsters: ", aliveMonsters.map((monster) => monster.id).length)
    return  aliveMonsters;
  }
  
  handleEnd() {
    if (this.isEnded) return;
    if (this.isWin()) {
      this.end(true);
    } else if (this.isLose()) {
      this.end(false);
    }
  }
  
  isWin() {
    return this.currentAliveMonsters().length === 0;
  }

  isLose() {
    return this.player.heart <= 0;
  }

  lastAliveMonster() {
    return this.currentAliveMonsters()?.[0];
  }

  end(isWin) {
    this.isEnded = true;
    console.log("match ended", isWin ? "win" : "lose");
    process.exit(0)
  }
}

module.exports = Match;
