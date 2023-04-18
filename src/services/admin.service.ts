import AdminRepository from "../repositories/admin.repository";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { CreateAdminDTO } from "../models/admin.model";

const secretJWT = "f358yngi5ng35igfrehptjetjg3292ni";

class AdminServices {
  async createAdmin(admin: string, password: string) {
    if (!admin || !password) {
      throw new Error("Preencha todos os campos");
    }

    const checkIfAdminExists = await AdminRepository.findAdminByName(admin);

    if (checkIfAdminExists) {
      throw new Error("Administrador já cadastrado");
    }

    // Hash password

    const salt = bcrypt.genSaltSync();
    const passwordHash = bcrypt.hashSync(password, salt);

    const adminCreated: CreateAdminDTO = {
      admin,
      password: passwordHash,
      createdAt: new Date(),
    };

    const adminRepo = await AdminRepository.createAdmin(adminCreated);

    return adminRepo;
  }

  async loginAdmin(admin: string, password: string) {
    if (!admin || !password) {
      throw new Error("Preencha todos os campos");
    }

    // check if admin exists
    const adminExists = await AdminRepository.findAdminByName(admin);

    if (!adminExists) {
      throw new Error("Administrador não encontrado");
    }

    if (!adminExists.password) {
      throw new Error("Senha do administrador não definida!");
    }

    if (!bcrypt.compare(password, adminExists.password)) {
      throw new Error("Senha incorreta!");
    }

    const result = await this.generateToken(adminExists.id);

    return result;
  }

  async generateToken(id: string) {
    const token = jwt.sign({ id }, secretJWT, {
      expiresIn: "1h",
    });
    return { token, id };
  }
}

export default new AdminServices();
