import Gameboard from "./gameboard";

export default class Player {
  constructor() {
    this.gameboard = new Gameboard();
  }
  getBoard() {
    return this.gameboard;
  }
}
