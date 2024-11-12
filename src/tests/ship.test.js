import Ship from "../utils/ship";

test("throws error when length <=0", () => {
  expect(() => new Ship(0)).toThrow();
});
test("hit function increases hits", () => {
  const ship = new Ship(3);
  ship.hit();
  expect(ship.hits).toBe(1);
  ship.hit();
  expect(ship.hits).toBe(2);
});
test("checkIfSunk function changes isSunk", () => {
  const ship = new Ship(3);
  ship.hit();
  ship.checkIfSunk();
  expect(ship.isSunk).toBe(false);
  ship.hit();
  ship.checkIfSunk();
  expect(ship.isSunk).toBe(false);
  ship.hit();
  ship.checkIfSunk();
  expect(ship.isSunk).toBe(true);
});
