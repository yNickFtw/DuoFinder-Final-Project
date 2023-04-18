import { CreateGameDTO, UpdateGameDTO, Game } from "../models/game.model";

class GameRepository {
  async createGame(game: CreateGameDTO) {
    return await Game.create(game);
  }

  async editedGame(gameId: string, gameEdited: UpdateGameDTO) {
    return await Game.updateOne({ _id: gameId }, { $set: gameEdited });
  }

  async deleteGame(gameId: string) {
    return await Game.deleteOne({ _id: gameId });
  }

  async getAllGames() {
    return await Game.find();
  }

  async getGameById(id: string) {
    return await Game.findById(id);
  }
}

export default new GameRepository();
