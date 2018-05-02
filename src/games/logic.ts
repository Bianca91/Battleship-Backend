import {
  ValidatorConstraint,
  ValidatorConstraintInterface
} from "class-validator";
import { BoardShips, BoardGuess, ShipShape, Symbol } from "./entities";

//Checking that the boards are valid
@ValidatorConstraint()
export class IsBoardShips implements ValidatorConstraintInterface {
  validate(boardships: BoardShips) {
    const symbols = [1, 2, 3, 4, 5, "miss", "hit", null];
    return (
      boardships.length === 10 &&
      boardships.every(
        row =>
          row.length === 10 &&
          row.every(symbol => symbols.includes(symbol.toString()))
      )
    );
  }
}

@ValidatorConstraint()
export class IsBoardGuess implements ValidatorConstraintInterface {
  validate(boardguess: BoardGuess) {
    const symbols = [1, 2, 3, 4, 5, "miss", "hit", null];
    return (
      boardguess.length === 10 &&
      boardguess.every(
        row =>
          row.length === 10 &&
          row.every(symbol => symbols.includes(symbol.toString()))
      )
    );
  }
}

export const isValidTransition = (
  playerSymbol: Symbol,
  from: BoardShips,
  to: BoardShips
) => {
  const changes = from
    .map((row, rowIndex) =>
      row.map((symbol, columnIndex) => ({
        from: symbol,
        to: to[rowIndex][columnIndex]
      }))
    )
    .reduce((a, b) => a.concat(b))
    .filter(change => change.from !== change.to);

  return (
    changes.length === 1 &&
    changes[0].to.toString() === playerSymbol &&
    changes[0].from === null
  );
};

//validation of ship placements
const boatsLength = {
  1:5,
  2:4,
  3:3,
  4:3,
  5:2
}

export const checkBoat = (boat, board) => {
  //count number of boat squares
  let counter = 0
  board.map(row => { return row.map(value => { return value === boat ? counter+=1 : counter })})

  let contained = false
  let arr = []

  //convert row into a string and check that the string [boat, boat, boat, ..] is contained

 for (let i = 0; i < boatsLength[boat]; i++)
  // {arr.push(i)}
  board.map(row => { return row.toString().indexOf(arr.toString()) !== -1 ? contained = true : contained})


  //column becomes row and check is made same as above
  let boardTransposed = board.map((row, y) => row.map((v, x) => board[x][y]))
  boardTransposed.map(row => { return row.toString().indexOf(arr.toString()) !== -1 ? contained = true : contained})

  //check that the counter is right and that the boat is horizontal or diagonal
  //return true
  if (counter === boatsLength[boat] && contained) return true
  return false
}
//
//check which ship was fired
export const checkWhatWasFired = (row, col, boatMap) => {
  let val = boatMap[row][col]
  //console.log(val);
  if (val === 0) return 1
  return 2
}

export const checkIfWon = (fireMap, boatMap, fired) => {
  let countFiresOnBoats = fired === 2 ? 1 : 0
  fireMap.map(row => { return row.map(value => { return value === 2 ? countFiresOnBoats+=1 : countFiresOnBoats })})

  let countBoats = 0
  boatMap.map(row => { return row.map(value => { return value > 0 ? countBoats+=1 : countBoats })})

  if (countFiresOnBoats === countBoats) return true
  return false
}
//Here the ships is already placed...
// So we need to see whether the moves the player makes is valid or not//
//Validation of player's moves
//maybe we won't need it -- think more about it
//
// //firing shots
// //here we check whether it was a miss / hit
// //maybe we should include a sink = which will be used by again in winner function
// export const checkFired = (value,  row, col, boatMap) => {
//   let val = boatMap[row][col]
//   if (val === 0) return 1
//   return 2
// }
// const currentPlayer =
// export const calculateWinner = (board: Board): Symbol | null =>
//   board
//
//   if (value !== 0 || gameState === "addBoats") return
//   let fired
//   if (currentPlayer === 1) {
//     fired = checkWhatWasFired(row, col, boatMapPlayer2)
//     console.log(fired);
//     fireP1(row, col, fired)
//     //changePlayer()
//   }
//   else {
//     fired = checkWhatWasFired(row, col, boatMapPlayer1)
//     console.log(fired);
//     fireP2(row, col, fired)
//     //changePlayer()
//   }

//if all opponent's ships are sunk you win
//It will be usefull to do tests to see whether this actually works.
