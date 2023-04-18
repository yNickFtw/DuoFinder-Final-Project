import { Request, Response } from "express";
import GameServices from "../services/game.service";
import { getUserIdFromToken } from "../middlewares/getloggeduser.middleware";

class GameController {
  async createGame(req: Request, res: Response) {
    try {
      const token = req.headers["authorization"] as string;

      const adminId = await getUserIdFromToken(token);

      if (!adminId) {
        return res.status(401).json({ message: "Token inválido!" });
      }

      const { name, imageUrl } = req.body;

      const game = await GameServices.createGame(adminId, name, imageUrl);
      return res
        .status(200)
        .json({ message: "Jogo criado com sucesso!", game });
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }

  async getAllGames(req: Request, res: Response) {
    try {
      const games = await GameServices.getAllGames();

      return res.status(200).json(games);
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }

  async editGame(req: Request, res: Response) {
    try {
      const token = req.headers["authorization"] as string;

      const adminId = await getUserIdFromToken(token);

      if (!adminId) {
        return res.status(401).json({ message: "Token inválido!" });
      }

      const gameId = req.params.id;

      const { name, imageUrl } = req.body;

      const editedGame = await GameServices.editGame(
        adminId,
        gameId,
        name,
        imageUrl
      );

      return res.status(200).json({ message: "Jogo editado com sucesso!" });
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }

  async deleteGame(req: Request, res: Response) {
    try {
      const token = req.headers["authorization"] as string;

      const adminId = await getUserIdFromToken(token);

      if (!adminId) {
        return res.status(401).json({ message: "Token inválido!" });
      }

      const gameId = req.params.id;

      const deletedGame = await GameServices.deleteGame(adminId, gameId);

      return res
        .status(200)
        .json({ message: "Jogo deletado com sucesso!", deletedGame });
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }

  async getGameById(req: Request, res: Response) {
    try {
      const id = req.params.id;

      const game = await GameServices.getGameById(id);
      return res.status(200).json(game);
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }
}
export default new GameController();
