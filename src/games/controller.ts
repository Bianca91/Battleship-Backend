import {
  JsonController,
  Authorized,
  CurrentUser,
  Post,
  Param,
  BadRequestError,
  HttpCode,
  NotFoundError,
  ForbiddenError,
  Get,
  Body,
  Patch
} from "routing-controllers";
import User from "../users/entity";
import { Game, Player, BoardShips, BoardGuess } from "./entities";
import {
  IsBoardShips,
  IsBoardGuess,
  isValidTransition
  // calculateWinner,
  // finished
} from "./logic";
import { Validate } from "class-validator";
import { io } from "../index";

class GameUpdate {
  @Validate(IsBoardShips, {
    message: "Not a valid board"
  })
  boardships: BoardShips;

  @Validate(IsBoardGuess, {
    message: "Not a valid board"
  })
  boardguess: BoardGuess;
}

@JsonController()
export default class GameController {
  @Authorized()
  @Post("/games")
  @HttpCode(201)
  async createGame(@CurrentUser() user: User) {
    const entity = await Game.create().save();

    await Player.create({
      game: entity,
      user,
      symbol: null
    }).save();

    const game = await Game.findOneById(entity.id);
    //ADD_GAME is a action...
    //this is linked to the createGame class in actions
    io.emit("action", {
      type: "ADD_GAME",
      payload: game
    });

    return game;
  }

  //This update is linked to UPDATE_GAME action in class
  @Authorized()
  @Post("/games/:id([0-9]+)/players")
  @HttpCode(201)
  async joinGame(@CurrentUser() user: User, @Param("id") gameId: number) {
    const game = await Game.findOneById(gameId);
    if (!game) throw new BadRequestError(`Game does not exist`);
    if (game.status !== "pending")
      throw new BadRequestError(`Game is already started`);

    game.status = "started";
    await game.save();

    const player = await Player.create({
      game,
      user,
      symbol: null
    }).save();

    io.emit("action", {
      type: "UPDATE_GAME",
      payload: await Game.findOneById(game.id)
    });

    return player;
  }

  @Authorized()
  // the reason that we're using patch here is because this request is not idempotent
  // meaning of idempotent: denoting an element of a set which is unchanged in value when multiplied or otherwise operated on by itself.
  // http://restcookbook.com/HTTP%20Methods/idempotency/
  // try to fire the same requests twice, see what happens
  @Patch("/games/:id([0-9]+)")
  async updateGame(
    @CurrentUser() user: User,
    @Param("id") gameId: number,
    @Body() update: GameUpdate
  ) {
    const game = await Game.findOneById(gameId);
    if (!game) throw new NotFoundError(`Game does not exist`);

    const player = await Player.findOne({ user, game });

    if (!player) throw new ForbiddenError(`You are not part of this game`);
    if (game.status !== "started")
      throw new BadRequestError(`The game is not started yet`);
    if (player.symbol !== game.turn)
      throw new BadRequestError(`It's not your turn`);
    if (!isValidTransition(player.symbol, game.board1, update.boardships)) {
      throw new BadRequestError(`Invalid move`);
    }

    //
    //   //Call function from the logic where we calculate the winner
    //     const winner = calculateWinner(update.board);
    //     if (winner) {
    //       game.winner = winner;
    //       game.status = "finished";
    //     } else if (finished(update.board)) {
    //       game.status = "finished";
    //     } else {
    //       game.turn = player.symbol === "x" ? "o" : "x";
    //     }
    //     game.board = update.board;
    //     await game.save();
    //
    //     io.emit("action", {
    //       type: "UPDATE_GAME",
    //       payload: game
    //     });
    //
    //     return game;
  }

  @Authorized()
  @Get("/games/:id([0-9]+)")
  getUser(@Param("id") id: number) {
    return Game.findOneById(id);
  }
  @Authorized()
  @Get("/games")
  async getGames() {
    return Game.find();
  }
}
