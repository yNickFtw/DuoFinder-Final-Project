import { Request, Response } from "express";
import UserService from "../services/users.service";

// middleware
import { getUserIdFromToken } from "../middlewares/getloggeduser.middleware";

class UserController {
  async registerUser(req: Request, res: Response) {
    const { nickname, email, password, ageUser, discordUser } = req.body;

    try {
      const user = await UserService.registerUser(
        nickname,
        email,
        password,
        ageUser,
        discordUser
      );

      return res
        .status(200)
        .json({ message: "Usuário criado com sucesso!", user });
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }

  async loginUser(req: Request, res: Response) {
    const { email, password } = req.body;

    try {
      const user = await UserService.loginUser(email, password);

      return res
        .status(200)
        .json({ message: "Usuário logado com sucesso!", user });
    } catch (error: any) {
      console.log(error);
      return res.status(400).json({ message: error.message });
    }
  }

  async getUsers(req: Request, res: Response) {
    try {
      const users = await UserService.getUsers();

      return res.status(200).json({ message: "Usuários encontrados!", users });
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }

  async getUserById(req: Request, res: Response) {
    const userId = req.params.id;

    try {
      const user = await UserService.getUserById(userId);

      return res.status(200).json({ message: "Usuário encontrado!", user });
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }

  async updateUser(req: Request, res: Response) {
    const token = req.headers["authorization"] as string;

    const userId = getUserIdFromToken(token);

    if (!userId) {
      return res
        .status(400)
        .json({ message: "Ocorreu um erro, tente novamente mais tarde!" });
    }

    try {
      const { nickname, ageUser, discordUser } = req.body;

      const updatedUser = await UserService.updatedUser(
        userId,
        nickname,
        ageUser,
        discordUser
      );

      return res
        .status(200)
        .json({ message: "Usuário atualizado com sucesso!", updatedUser });
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }

  async deleteUser(req: Request, res: Response) {
    try {
      const token = req.headers["authorization"] as string;

      const userId = getUserIdFromToken(token);

      if (!userId) {
        return res
          .status(400)
          .json({ message: "ID do usuário não foi passado no cabeçalho!" });
      }

      await UserService.deleteUser(userId);
      return res.status(200).json({ message: "Usuário deletado com sucesso!" });
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }
}

export default new UserController();
