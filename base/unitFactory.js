const { units } = require("../constants/types.constant");
const Archer = require("../units/archer");
const Dragon = require("../units/dragon");
const Goon = require("../units/goon");
const Zeus = require("../units/zeus");
const { generateId } = require("../utils/id.util");

class UnitFactory {
  constructor(match) {
    this.match = match;
  }

  createUnit(type) {
    const id = generateId();
    switch (type) {
      case units.GOON:
        return new Goon(id, this.match, type);
      case units.ARCHER:
        return new Archer(id, this.match, type);
      case units.DRAGON:
        return new Dragon(id, this.match, type);
      case units.ZEUS:
        return new Zeus(id, this.match, type);
      default:
        throw new Error("Invalid unit type");
    }
  }
}

module.exports = UnitFactory;
