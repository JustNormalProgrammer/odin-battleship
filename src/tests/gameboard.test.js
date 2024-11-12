import Gameboard from "../utils/gameboard";
import Ship from "../utils/ship";

describe("checking placeShip function", () => {
  const game = new Gameboard();
  const ship1 = new Ship(3);
  game.placeShip(ship1, [0, 0]);
  test("places first ship horizontally", () => {
    expect(
      game.board[0][0] === ship1 &&
        game.board[0][1] === ship1 &&
        game.board[0][2] === ship1,
    ).toBe(true);
  });
  const ship2 = new Ship(2);
  game.placeShip(ship2, [1, 0], false);
  test("places second ship vertically", () => {
    expect(game.board[1][0] === ship2 && game.board[2][0] === ship2).toBe(true);
  });
  const ship3 = new Ship(1);
  test("returns false when ship cannot be placed", () => {
    expect(game.placeShip(ship3, [1, 0], false)).toBe(false);
  });
});
describe("checking receiveAttack function", () => {
  const game = new Gameboard();
  const ship1 = new Ship(3);
  game.placeShip(ship1, [0, 0]);
  test("function returns true when ship is hit", () => {
    expect(game.receiveAttack(0, 0)).toBe(true);
  });
  test("function returns false when missed", () => {
    expect(game.receiveAttack(1, 0)).toBe(false);
  });
  test("function saves missed shot coordinates", () => {
    expect(game.missed).toEqual([[1, 0]]);
  });
  test("function increases ships hit number", () => {
    expect(ship1.hits).toBe(1);
  });
});
describe("checking allShipsSunk function", () => {
  const game = new Gameboard();
  const ship1 = new Ship(2);

  test("function returns false when no ships on board", () => {
    expect(game.allShipsSunk()).toBe(false);
  });
  test("function returns false when one ship is not sunk", () => {
    game.placeShip(ship1, [0, 0]);
    expect(game.allShipsSunk()).toBe(false);
  });
  test("function returns false when ship is hit but not sunk", () => {
    game.receiveAttack(0, 0);
    expect(game.allShipsSunk()).toBe(false);
  });
  test("function returns true when all ships are sunk", () => {
    game.receiveAttack(0, 1);
    expect(game.allShipsSunk()).toBe(true);
  });
  test("function returns true when all (multiple) ships are sunk", () => {
    const ship2 = new Ship(1);
    game.placeShip(ship2, [1, 0]);
    game.receiveAttack(1, 0);
    expect(game.allShipsSunk()).toBe(true);
  });
});
