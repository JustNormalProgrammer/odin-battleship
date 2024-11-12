export default class Ship {
  constructor(length) {
    if (length <= 0) throw new Error("Ship length must be a positive value");
    this.length = length;
    this.hits = 0;
    this.isSunk = false;
  }
  hit() {
    this.hits++;
  }
  checkIfSunk() {
    if (this.hits >= this.length) {
      this.isSunk = true;
    }
    return this.isSunk;
  }
}
