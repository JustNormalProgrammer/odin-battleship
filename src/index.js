import Gameboard from "./utils/gameboard";
import Ship from "./utils/ship";
import Player from "./utils/player";
import "./style.css";

const gameController = function (isSinglePlayer) {
  const player1 = new Player();
  const player2 = new Player();
  let activePlayer = player1;
  let attackedPlayer = player2;
  let isGameOver = false;
  function getPlayers() {
    return [player1, player2];
  }
  function checkIfGameTypeSingle() {
    return isSinglePlayer;
  }
  function getActivePlayer() {
    return activePlayer;
  }
  function switchActivePlayer() {
    activePlayer = activePlayer === player1 ? player2 : player1;
    attackedPlayer = attackedPlayer === player1 ? player2 : player1;
  }
  function computerMove() {
    let validMove;
    let x = Math.floor(Math.random() * 10);
    let y = Math.floor(Math.random() * 10);
    let result = null;
    while (result === null) {
      result = player1.getBoard().receiveAttack(x, y);
      if (result !== null) {
        console.log([x, y]);
        return [[x, y], result];
      }
      x = Math.floor(Math.random() * 10);
      y = Math.floor(Math.random() * 10);
    }
  }
  function getAttackedPlayer() {
    return attackedPlayer;
  }
  function checkIfGameOver() {
    return attackedPlayer.getBoard().allShipsSunk();
  }
  player1.gameboard.placeShip(new Ship(3), [1, 0]);
  player2.gameboard.placeShip(new Ship(3), [1, 0], false);

  return {
    getPlayers,
    getActivePlayer,
    getAttackedPlayer,
    switchActivePlayer,
    computerMove,
    checkIfGameOver,
    checkIfGameTypeSingle,
  };
};
const screenController = function () {
  let game;
  let player1, player2;
  startNewGame(true);
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
      cell2.dataset.board = player2.getId();
      cell2.classList.add("cell");
      gameboard2.appendChild(cell2);
      cell1.dataset.id = i;
      cell1.dataset.board = player1.getId();
      cell1.classList.add("cell");
      cell1.addEventListener("click", (e) => {
        moveController(e.target);
      });
      cell2.addEventListener("click", (e) => {
        moveController(e.target);
      });
      gameboard1.appendChild(cell1);
    }
    container.appendChild(gameboard1);
    container.appendChild(gameboard2);
  }
  function moveController(div) {
    let isValid = handleAttack(div);
    if (!isValid) return;
    if (game.checkIfGameOver()) {
      renderFinalMessage();
      return;
    } else if (game.checkIfGameTypeSingle()) {
      game.switchActivePlayer();
      const [move, result] = game.computerMove();
      const idx = move[0] * 10 + move[1];
      const div = document.querySelector(
        `[data-id = "${idx}"][data-board = "${game.getAttackedPlayer().getId()}"]`,
      );
      markCell(div, result);
      if (game.checkIfGameOver()) {
        renderFinalMessage();
        return;
      }
      game.switchActivePlayer();
    }
  }
  function renderShips(player) {
    let buttonBoard1 = document.querySelectorAll(
      `[data-board = "${player.getId()}"]`,
    );
    for (let i = 0; i < 100; i++) {
      const x = Math.floor(i / 10);
      const y = i % 10;
      if (player.gameboard.checkIfShipOnCords(x, y)) {
        buttonBoard1[i].classList.add("ship");
      }
    }
  }
  function renderFinalMessage() {
    const div = document.querySelector(".final-msg");
    div.textContent = `Congrats player${game.getActivePlayer().getId()}. You've won!`;
  }
  function startNewGame(isSinglePlayer) {
    game = new gameController(isSinglePlayer);
    [player1, player2] = game.getPlayers();
  }
  function handleAttack(div) {
    const activeBoard = game.getActivePlayer().getBoard();
    const clickedBoard =
      div.dataset.board == player1.getId()
        ? player1.getBoard()
        : player2.getBoard();

    if (activeBoard === clickedBoard || game.checkIfGameOver()) return false;
    let cellIdx = div.dataset.id;
    const result = clickedBoard.receiveAttack(
      Math.floor(cellIdx / 10),
      cellIdx % 10,
    );
    markCell(div, result);
    return true;
  }
  function markCell(div, result) {
    result ? div.classList.add("hit") : div.classList.add("miss");
    if (result instanceof Ship && result?.checkIfSunk()) {
      for (let cord of game
        .getAttackedPlayer()
        .getBoard()
        .getShipCords(result)) {
        let idx = cord[0] * 10 + cord[1];
        let button = document.querySelector(
          `[data-id = "${idx}"][data-board = "${game.getAttackedPlayer().getId()}"]`,
        );
        button.classList.add("sunk");
      }
    }
  }
  createBoards();
  renderShips(player1);
};
screenController();
