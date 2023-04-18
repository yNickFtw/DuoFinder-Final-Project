import { CreateGameDTO, UpdateGameDTO } from "../models/game.model";
import GameRepository from "../repositories/game.repositories";
import AdminRepository from "../repositories/admin.repository";

class GameServices {
  async createGame(adminId: string, name: string, imageUrl: string) {
    const admin = await AdminRepository.findAdminById(adminId);

    if (!name || !imageUrl || !admin) {
      throw new Error(
        "Preencha todos os campos, ou o admin passado pela requisição não foi encontado!"
      );
    }

    const newGame: CreateGameDTO = {
      name,
      imageUrl,
      admin,
      createdAt: new Date(),
    };

    const game = await GameRepository.createGame(newGame);
    return game;
  }

  async editGame(
    adminId: string,
    gameId: string,
    name: string,
    imageUrl: string
  ) {
    const admin = await AdminRepository.findAdminById(adminId);

    if (!name || !imageUrl || !admin) {
      throw new Error(
        "Preencha todos os campos, ou o admin passado pela requisição não foi encontado!"
      );
    }

    const game = await GameRepository.getGameById(gameId);

    if (!game) {
      throw new Error("Jogo não encontrado!");
    }

    const editedGame: UpdateGameDTO = {
      name,
      imageUrl,
      adminEdited: admin,
      updatedAt: new Date(),
    };

    const gameEdited = await GameRepository.editedGame(gameId, editedGame);
    return gameEdited;
  }

  async deleteGame(adminId: string, gameId: string) {
    const admin = await AdminRepository.findAdminById(adminId);

    if (!admin) {
      throw new Error("O admin passado pela requisição não foi encontrado!");
    }

    const game = await GameRepository.getGameById(gameId);

    if (!game) {
      throw new Error("Jogo não encontrado!");
    }

    const gameDeleted = await GameRepository.deleteGame(gameId);
    return gameDeleted;
  }

  async getAllGames() {
    const games = await GameRepository.getAllGames();
    return games;
  }

  async getGameById(id: string) {
    const game = await GameRepository.getGameById(id);

    if (!game) {
      throw new Error("Jogo não encontrado");
    }

    return game;
  }
}

export default new GameServices();
