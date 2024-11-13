import Ship from "./ship.js";

export default class Gameboard {
  constructor() {
    this.board = Array.from(Array(10), () => new Array(10).fill(null));
    this.missed = [];
    this.ships = [];
  }
  placeShip(ship, start, isHorizontal = true) {
    let shipsCords = [];
    if (isHorizontal) {
      for (let i = 0; i < ship.length; i++) {
        if (
          !this.validateCoordinates(start[0], start[1] + i) ||
          this.checkIfShipOnCords(start[0], start[1] + i)
        )
          return false;
        shipsCords.push([start[0], start[1] + i]);
      }
    } else {
      for (let i = 0; i < ship.length; i++) {
        if (
          !this.validateCoordinates(start[0] + i, start[1]) ||
          this.checkIfShipOnCords(start[0] + i, start[1])
        )
          return false;
        shipsCords.push([start[0] + i, start[1]]);
      }
    }
    for (let cord of shipsCords) {
      this.board[cord[0]][cord[1]] = ship;
    }
    this.ships.push(ship);
    return shipsCords;
  }
  validateCoordinates(x, y) {
    return x >= 0 && x <= 9 && y >= 0 && y <= 9;
  }
  checkIfShipOnCords(x, y) {
    return this.board[x][y] !== null;
  }
  receiveAttack(x, y) {
    if (!this.validateCoordinates(x, y)) return null;
    if (this.missed.includes([x, y])) return null;
    if (!this.checkIfShipOnCords(x, y)) {
      this.missed.push([x, y]);
      return null;
    }
    const ship = this.board[x][y];
    ship.hit();
    this.board[x][y] = null;
    return ship;
  }
  allShipsSunk() {
    if (this.ships.length === 0) return false;
    for (let ship of this.ships) {
      if (!ship.checkIfSunk()) {
        return false;
      }
    }
    return true;
  }
}
