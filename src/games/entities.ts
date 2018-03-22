import {
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  Entity,
  Index,
  OneToMany,
  ManyToOne
} from "typeorm";

import User from "../users/entity";

export type Symbol = 1 | 2 | 3 | 4 | 5 | "miss" | "hit" | null;
export type Row = [ Symbol |
  Symbol | null,
  Symbol | null,
  Symbol | null,
  Symbol | null,
  Symbol | null,
  Symbol | null,
  Symbol | null,
  Symbol | null,
  Symbol | null,
  Symbol | null,
  Symbol |
  null
];
export type BoardShips = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
];

export type BoardGuess = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
];

type Status = "pending" | "started" | "finished";

const emptyboard1: BoardShips = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
];

const emptyboard2: BoardGuess = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
];

export type ShipShape = {
  1: {
    name: "carrier";
    length: 5;
  };

  2: {
    name: "BattleShip";
    length: 4;
  };

  3: {
    name: "Submarine";
    length: 3;
  };

  4: {
    name: "Cruiser";
    length: 3;
  };

  5: {
    name: "Destroyer";
    length: 2;
  };
};

const shipShape: ShipShape = {
  1: {
    name: "carrier",
    length: 5
  },

  2: {
    name: "BattleShip",
    length: 4
  },

  3: {
    name: "Submarine",
    length: 3
  },

  4: {
    name: "Cruiser",
    length: 3
  },

  5: {
    name: "Destroyer",
    length: 2
  }
};
@Entity()
export class Game extends BaseEntity {
  @PrimaryGeneratedColumn() id?: number;

  @Column("json", { default: emptyboard1 })
  board1: BoardShips;

  @Column("json", { default: emptyboard2 })
  board2: BoardGuess;

  @Column("json", { nullable: true})
  shipShape: ShipShape

  @Column("text", { default: null })
  turn: Symbol;

  @Column("text", {  nullable: true })
  winner: Symbol;

  @Column("text", { default: "pending" })
  status: Status;

  // this is a relation, read more about them here:
  // http://typeorm.io/#/many-to-one-one-to-many-relations
  @OneToMany(_ => Player, player => player.game, { eager: true })
  players: Player[];
}
//table for ships? or include with player table?
//one player has many ships/// but ships linked to one player

@Entity()
@Index(["game", "user", "symbol"], { unique: true })
export class Player extends BaseEntity {
  @PrimaryGeneratedColumn() id?: number;

  @ManyToOne(_ => User, user => user.players)
  user: User;

  @ManyToOne(_ => Game, game => game.players)
  game: Game;

  @Column("char", { length: 1, nullable: true })
  symbol: Symbol;

  @Column()
  userId: number
}
