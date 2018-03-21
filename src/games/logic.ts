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

//validation of ship placements
// const boatsLength = {
//   1:5,
//   2:4,
//   3:3,
//   4:3,
//   5:2
// }
//
// export const checkBoat = (boat, board) => {
//   //count number of boat squares
//   let counter = 0
//   board.map(row => { return row.map(value => { return value === boat ? counter+=1 : counter })})
//
//   let contained = false
//   let arr = []
//
//   //convert row into a string and check that the string [boat, boat, boat, ..] is contained
//   for (let i = 0; i < boatsLength[boat]; i++) {arr.push(boat)}
//   board.map(row => { return row.toString().indexOf(arr.toString()) !== -1 ? contained = true : contained})
//
//
//   //column becomes row and check is made same as above
//   let boardTransposed = board.map((row, y) => row.map((v, x) => board[x][y]))
//   boardTransposed.map(row => { return row.toString().indexOf(arr.toString()) !== -1 ? contained = true : contained})
//
//   //check that the counter is right and that the boat is horizontal or diagonal
//   //return true
//   if (counter === boatsLength[boat] && contained) return true
//   return false
// }
//
// //check which ship was fired
// export const checkWhatWasFired = (row, col, boatMap) => {
//   let val = boatMap[row][col]
//   //console.log(val);
//   if (val === 0) return 1
//   return 2
// }
//
// //Here the ships is already placed...
// // So we need to see whether the moves the player makes is valid or not//
// //Validation of player's moves
// //maybe we won't need it -- think more about it
// export const isValidTransition = (playerSymbol: Symbol, from: BoardShips, to: BoardShips) => {
//   const changes = from
//     .map(
//       (row, rowIndex) => row.map((symbol, columnIndex) => ({
//         from: symbol,
//         to: to[rowIndex][columnIndex]
//       }))
//     )
//     .reduce((a,b) => a.concat(b))
//     .filter(change => change.from !== change.to)
//
//   return changes.length === 1 &&
//     changes[0].to === playerSymbol &&
//     changes[0].from === null
// }
//
// //firing shots
// //here we check whether it was a miss / hit
// //maybe we should include a sink = which will be used by again in winner function
// handleClick = () => {
//   const {row, col, fireP1, fireP2, boatMapPlayer1, boatMapPlayer2, currentPlayer, changePlayer, value, gameState} = this.props
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
// }
// //if all opponent's ships are sunk you win
// //It will be usefull to do tests to see whether this actually works.
//
// export const calculateWinner = (board: Board): Symbol | null =>
//   board
//     .concat(
//       // vertical winner
//       [0, 1, 2].map(n => board.map(row => row[n])) as Row[]
//     )
//     .concat(
//       [
//         // diagonal winner ltr
//         [0, 1, 2].map(n => board[n][n]),
//         // diagonal winner rtl
//         [0, 1, 2].map(n => board[2-n][n])
//       ] as Row[]
//     )
//     .filter(row => row[0] && row.every(symbol => symbol === row[0]))
//     .map(row => row[0])[0] || null
//
// export const finished = (board: Board): boolean =>
//   board
//     .reduce((a,b) => a.concat(b) as Row)
//     .filter(symbol => symbol === null)
//     .length === 0
