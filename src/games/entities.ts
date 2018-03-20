// import {
//   BaseEntity,
//   PrimaryGeneratedColumn,
//   Column,
//   Entity,
//   Index,
//   OneToMany,
//   ManyToOne
// } from "typeorm";
//
// import User from "../users/entity";
//
// export type Symbol = "miss" | "hit" | null;
//
// export type BoardShips = [
//   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
// ];
//
// export type BoardGuess = [
//   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
// ];
//
// type Status = "pending" | "started" | "finished";
//
// const emptyBoard1: BoardShips = [
//   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
// ];
//
// const emptyBoard2: BoardGuess = [
//   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
// ];
//
// export type ShipShape = {
//   carrier: {
//     length: 5;
//   };
//   BattleShip: {
//     length: 4;
//   };
//   Submarine: {
//     length: 3;
//   };
//   Cruiser: {
//     length: 3;
//   };
//   Destroyer: {
//     length: 2;
//   };
// };
//
// const shipShape: ShipShape = {
//   carrier: {
//     length: 5
//   },
//   BattleShip: {
//     length: 4
//   },
//   Submarine: {
//     length: 3
//   },
//   Cruiser: {
//     length: 3
//   },
//   Destroyer: {
//     length: 2
//   }
// };
//
// @Entity()
// export class Game extends BaseEntity {
//   @PrimaryGeneratedColumn() id?: number;
//
//   @Column("json", { default: emptyBoard1 })
//   boardships: BoardShips;
//
//   @Column("json", { default: emptyBoard2 })
//   boardguess: BoardGuess;
//
//   @Column("char", { length: 1, default: null })
//   turn: Symbol;
//
//   @Column("char", { length: 1, nullable: true })
//   winner: Symbol;
//
//   @Column("text", { default: "pending" })
//   status: Status;
//
//   @Column("json", { default: shipShape })
//   shipShape: ShipShape;
//
//   // this is a relation, read more about them here:
//   // http://typeorm.io/#/many-to-one-one-to-many-relations
//   @OneToMany(_ => Player, player => player.game, { eager: true })
//   players: Player[];
// }
// //table for ships? or include with player table?
// //one player has many ships/// but ships linked to one player
//
// @Entity()
// @Index(["game", "user", "symbol"], { unique: true })
// export class Player extends BaseEntity {
//   @PrimaryGeneratedColumn() id?: number;
//
//   @ManyToOne(_ => User, user => user.players)
//   user: User;
//
//   @ManyToOne(_ => Game, game => game.players)
//   game: Game;
//
//   @Column() userId: number;
//
//   @Column("char", { length: 1 })
//   symbol: Symbol;
// }
