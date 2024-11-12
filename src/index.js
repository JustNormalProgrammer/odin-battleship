import Gameboard from "./utils/gameboard";
import Ship from "./utils/ship";
import Player from "./utils/player";
import "./style.css";

const gameController = function () {
  const player1 = new Player();
  const player2 = new Player();

  function getPlayers() {
    return [player1, player2];
  }
  player1.gameboard.placeShip(new Ship(2), [0, 0]);
  player2.gameboard.placeShip(new Ship(3), [1, 0], false);

  return { getPlayers };
};
const screenController = function () {
  const game = gameController();

  function createBoards() {
    const container = document.querySelector(".container");
    const gameboard1 = document.createElement("div");
    const gameboard2 = document.createElement("div");
    gameboard1.classList.add("gameboard");
    gameboard2.classList.add("gameboard");
    for (let i = 0; i < 100; i++) {
      let cell1 = document.createElement("div");
      let cell2 = document.createElement("div");
      cell2.dataset.id = i;
      cell2.dataset.board = "2";
      cell2.classList.add("cell");
      gameboard2.appendChild(cell2);
      cell1.dataset.id = i;
      cell1.dataset.board = "1";
      cell1.classList.add("cell");
      gameboard1.appendChild(cell1);
    }
    container.appendChild(gameboard1);
    container.appendChild(gameboard2);
  }
  function renderShips() {
    let buttonBoard1 = document.querySelectorAll('[data-board = "1"]');
    let buttonBoard2 = document.querySelectorAll('[data-board = "2"]');
    let [player1, player2] = game.getPlayers();

    for (let i = 0; i < 100; i++) {
      if (player1.gameboard.checkIfShipOnCords(Math.floor(i / 10), i % 10)) {
        buttonBoard1[i].classList.add("ship");
      }
      if (player2.gameboard.checkIfShipOnCords(Math.floor(i / 10), i % 10)) {
        buttonBoard2[i].classList.add("ship");
      }
    }
  }
  createBoards();
  renderShips();
};
screenController();
