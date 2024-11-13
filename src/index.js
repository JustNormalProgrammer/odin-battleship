import Gameboard from "./utils/gameboard";
import Ship from "./utils/ship";
import Player from "./utils/player";
import "./style.css";

const gameController = function () {
  const player1 = new Player();
  const player2 = new Player();
  let activePlayer = player1;
  let attackedPlayer = player2;
  function getPlayers() {
    return [player1, player2];
  }
  function getActivePlayer() {
    return activePlayer;
  }
  function switchActivePlayer() {
    activePlayer = activePlayer === player1 ? player2 : player1;
    attackedPlayer = attackedPlayer === player1 ? player2 : player1;
  }
  function getAttackedPlayer() {
    return attackedPlayer;
  }
  player1.gameboard.placeShip(new Ship(3), [1, 0]);
  player2.gameboard.placeShip(new Ship(3), [1, 0], false);
  console.log(player1.gameboard);

  return { getPlayers, getActivePlayer, getAttackedPlayer, switchActivePlayer };
};
const screenController = function () {
  const game = gameController();
  let [player1, player2] = game.getPlayers();

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
      cell1.addEventListener("click", handleAttack);
      cell2.addEventListener("click", handleAttack);
      gameboard1.appendChild(cell1);
    }
    container.appendChild(gameboard1);
    container.appendChild(gameboard2);
  }
  function renderShips(player) {
    let idx = getPlayerIdx(player);
    let buttonBoard1 = document.querySelectorAll(`[data-board = "${idx}"]`);

    for (let i = 0; i < 100; i++) {
      const x = Math.floor(i / 10);
      const y = i % 10;
      if (player.gameboard.checkIfShipOnCords(x, y)) {
        buttonBoard1[i].classList.add("ship");
      }
    }
  }
  function getPlayerIdx(player) {
    return player === player1 ? 1 : 2;
  }
  function handleAttack() {
    const activeBoard = game.getActivePlayer().getBoard();
    const clickedBoard =
      this.dataset.board == 1 ? player1.getBoard() : player2.getBoard();

    if (activeBoard === clickedBoard) return;
    let cellIdx = this.dataset.id;
    const ship = clickedBoard.receiveAttack(
      Math.floor(cellIdx / 10),
      cellIdx % 10,
    );
    ship ? this.classList.add("hit") : this.classList.add("miss");
    if (ship?.checkIfSunk()) {
      for (let cord of game.getAttackedPlayer().getBoard().getShipCords(ship)) {
        let idx = cord[0] * 10 + cord[1];
        let button = document.querySelector(
          `[data-id = "${idx}"][data-board = "${getPlayerIdx(game.getAttackedPlayer)}"]`,
        );
        console.log(button);
        button.classList.add("sunk");
      }
    }
    return;
  }

  createBoards();
  renderShips(player1);
};
screenController();
