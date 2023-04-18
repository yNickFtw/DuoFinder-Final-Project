import { Request, Response } from "express";
import AdminServices from "../services/admin.service";

class AdminController {
  async createAdmin(req: Request, res: Response) {
    try {
      const { admin, password } = req.body;

      const response = await AdminServices.createAdmin(admin, password);

      return res
        .status(200)
        .json({ message: "Admin criado com sucesso!", response });
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }

  async loginAdmin(req: Request, res: Response) {
    try {
      const { admin, password } = req.body;

      const response = await AdminServices.loginAdmin(admin, password);

      return res
        .status(200)
        .json({ message: "Login realizado com sucesso!", response });
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }
}

export default new AdminController();
