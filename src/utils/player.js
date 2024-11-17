import Gameboard from "./gameboard";

export default class Player {
  static playerId = 0;
  constructor() {
    this.gameboard = new Gameboard();
    this.id = Player.playerId++;
  }
  getBoard() {
    return this.gameboard;
  }
  getId() {
    return this.id;
  }
  resetBoard() {
    this.gameboard = new Gameboard();
  }
}
