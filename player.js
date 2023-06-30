const UnitFactory = require("./base/unitFactory");
const { units: unitTypes } = require("./constants/types.constant");

class Player {
  /**
   * @param {Number} id
   * @param {import("./match")} match
   */
  #heart;
  constructor(id, match) {
    this.id = id;
    this.match = match;
    this.#heart = 3;
    this.mana = 0;
    this.manaRegen = 1; // per second
    this.manaRegenInterval = 1000; // ms
  }

  set heart(value) {
    console.log("current heart", this.#heart, "new heart", value);
    if (value <= 0) {
      this.#heart = 0;
      this.match.handleEnd();
    }
    this.#heart = value;
  }

  get heart() {
    return this.#heart;
  }

  start() {
    this.#startManaRegen();
  }

  #startManaRegen() {
    setInterval(() => {
      this.mana += this.manaRegen;
      if (this.mana % 5 === 0) {
        console.log("mana %5 ", this.mana);
        this.requestNewUnit();
      }
      const twoUnitsSame = this.match.units.reduce((acc, unit, index, units) => {
        // only need to find a pair to merge, types should be same
        if (acc.length === 2) return acc;
        const sameTypeUnits = units.filter((u) => u.type === unit.type && u.level === unit.level);
        if (sameTypeUnits.length === 2) {
          acc = sameTypeUnits;
        }
        return acc;
      }, []);
      if (twoUnitsSame) {
        const filrstUnit = twoUnitsSame[0];
        const secondUnit = twoUnitsSame[1];
        if (filrstUnit && secondUnit) {
          this.margeUnit(filrstUnit.id, secondUnit.id);
        }
      }
    }, this.manaRegenInterval);
  }

  requestNewUnit() {
    const randomType = this.#getRandomUnitType();
    const unitFactory = new UnitFactory(this.match);
    const unit = unitFactory.createUnit(randomType);
    try {
      console.log("try to request unit", randomType, "with mana", this.mana);
      this.match.requestUnit(this, unit);
    } catch (error) {
      if (error.message === "Not enough mana") {
        console.log("Not enough mana");
      }
    }
  }

  #getRandomUnitType() {
    const totalUnitTypes = Object.keys(unitTypes).length;
    const randomIndex = Math.floor(Math.random() * totalUnitTypes);
    const randomType = Object.values(unitTypes)[randomIndex];
    return randomType;
  }

  margeUnit(newUnitId, oldUnitId) {
    try {
      this.match.mergeUnit(newUnitId, oldUnitId);
      const newUnit = this.match.units.find((unit) => unit.id === newUnitId)
      console.log("merge success", "level up unit",newUnit.type, newUnit.level);
    } catch (error) {
      console.log("merge error", error);
    }
  }
}

module.exports = Player;
