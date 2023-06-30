const Match = require('../match')
class Monster {
  #moveInterval;
  /**
   * @param {Number} id
   * @param {Match} match
   */
  constructor(id, match) {
    this.id = id;
    this.match = match;
    this.health = 700;
    this.moveSpeed = 300;
    this.manaOnDeath = 5;
    this.isDead = false;
    this.positionInMap = 0; // in map length
  }

  start() {
    this.#startMoving();
  }

  #startMoving() {
    console.log("monster", this.id, "start moving")
    this.#moveInterval = setInterval(() => {
      this.positionInMap += this.moveSpeed;
      if (this.isReachedEnd()) {
        console.log("monster", this.id, "reached end")
        this.#attackTower();
        this.#stopMoving();
      }
    }, 1000);
  }

  isReachedEnd() {
    return this.positionInMap >= this.match.mapLength;
  }

  #attackTower() {
    console.log("monster", this.id, "attack tower")
    this.match.player.heart -= 1;
  }

  #stopMoving() {
    console.log("monster", this.id, "stop moving")
    clearInterval(this.#moveInterval);
  }

  giveDamage(damage) {
    this.health -= damage;
    console.log("monster", this.id, "health", this.health);
    if (this.health <= 0) {
      this.#die();
    }
  }

  #die() {
    console.log("monster", this.id, "die");
    this.match.player.mana += this.manaOnDeath;
    this.#stopMoving();
    this.isDead = true;
    this.match.handleEnd();
  }

  isActive() {
    return !this.isDead && !this.isReachedEnd();
  }
}

module.exports = Monster;
