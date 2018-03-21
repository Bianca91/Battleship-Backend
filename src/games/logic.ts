// import {
//   ValidatorConstraint,
//   ValidatorConstraintInterface
// } from "class-validator";
// import { BoardShips, BoardGuess, ShipShape, Symbol } from "./entities";
//
// @ValidatorConstraint()
// export class IsBoardShips implements ValidatorConstraintInterface {
//   validate(boardships: BoardShips) {
//     const symbols = [1, 2, 3, 4, 5, "miss", "hit", null];
//     return (
//       boardships.length === 10 &&
//       boardships.every(
//         row =>
//           row.length === 10 &&
//           row.every(symbol => symbols.includes(symbol.toString()))
//       )
//     );
//   }
// }
//
// @ValidatorConstraint()
// export class IsBoardGuess implements ValidatorConstraintInterface {
//   validate(boardguess: BoardGuess) {
//     const symbols = [1, 2, 3, 4, 5, "miss", "hit", null];
//     return (
//       boardguess.length === 10 &&
//       boardguess.every(
//         row =>
//           row.length === 10 &&
//           row.every(symbol => symbols.includes(symbol.toString()))
//       )
//     );
//   }
// }
//
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
// // export const calculateWinner = (board: Board): Symbol | null =>
// //   board
// //     .concat(
// //       // vertical winner
// //       [0, 1, 2].map(n => board.map(row => row[n])) as Row[]
// //     )
// //     .concat(
// //       [
// //         // diagonal winner ltr
// //         [0, 1, 2].map(n => board[n][n]),
// //         // diagonal winner rtl
// //         [0, 1, 2].map(n => board[2-n][n])
// //       ] as Row[]
// //     )
// //     .filter(row => row[0] && row.every(symbol => symbol === row[0]))
// //     .map(row => row[0])[0] || null
// //
// // export const finished = (board: Board): boolean =>
// //   board
// //     .reduce((a,b) => a.concat(b) as Row)
// //     .filter(symbol => symbol === null)
// //     .length === 0
