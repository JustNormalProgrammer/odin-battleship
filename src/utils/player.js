import Gameboard from "./gameboard";

export default class Player {
  constructor(gameboard = new Gameboard()) {
    this.gameboard = gameboard;
  }
}
