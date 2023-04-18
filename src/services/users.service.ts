import UserRepository from "../repositories/users.repositories";
import { CreateUserDTO, UpdateUserDTO, User } from "../models/user.model";
import bcrypt, { genSalt } from "bcryptjs";
import jwt from "jsonwebtoken";

const secretJWT = "f358yngi5ng35igfrehptjetjg3292ni";

class UserService {
  async registerUser(
    nickname: string,
    email: string,
    password: string,
    ageUser: string,
    discordUser: string
  ) {
    if (!nickname || !email || !password || !ageUser || !discordUser) {
      throw new Error("Preencha todos os campos!");
    }

    const salt = await genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser: CreateUserDTO = {
      nickname: nickname,
      email: email,
      password: passwordHash,
      discordUser: discordUser,
      ageUser: ageUser,
    };

    const userExists = await UserRepository.checkIfUserExistsByEmail(
      newUser.email
    );

    if (userExists) {
      throw new Error("Já existe um usuário com este email");
    }

    const user = await UserRepository.registerUser(newUser);

    return user;
  }

  async loginUser(email: string, password: string) {
    try {
      if (!email || !password) {
        throw new Error("Preencha todos os campos!");
      }

      const userExists = await UserRepository.checkIfUserExistsByEmail(email);

      if (!userExists) {
        throw new Error("Usuário não encontrado!");
      }

      if (!userExists.password) {
        throw new Error("A senha do usuario não foi definida");
      }

      if (!(await bcrypt.compare(password, userExists.password))) {
        throw new Error("Senha inválida!");
      }

      const result = await this.generateToken(userExists.id);

      return { result };
    } catch (error: any) {
      throw new Error("Ocorreu um erro, tente fazer login novamente.");
    }
  }

  async getUsers() {
    const users = await UserRepository.getAllUsers();

    if (!users) {
      throw new Error("Nenhum usuário encontrado!");
    }

    return users;
  }

  async getUserById(userId: string) {
    const user = await UserRepository.findById(userId);

    if (!user) {
      throw new Error("Usuário não encontrado!");
    }

    return user;
  }

  async updatedUser(
    userId: string,
    nickname: string,
    ageUser: string,
    discordUser: string
  ) {
    const userExists = await UserRepository.findById(userId);

    if (!userExists) {
      throw new Error("Usuário não encontrado!");
    }

    if (!nickname || !ageUser || !discordUser) {
      throw new Error("Preencha todos os campos!");
    }

    const updatedUser: UpdateUserDTO = {
      nickname,
      ageUser,
      discordUser,
    };

    const user = await UserRepository.updateUser(userId, updatedUser);

    return user;
  }

  async deleteUser(userId: string) {
    const userExists = UserRepository.findById(userId);

    if (!userExists) {
      throw new Error("Usuário não encontrado");
    }

    return await UserRepository.deleteUser(userId);
  }

  async generateToken(id: string) {
    const user = await UserRepository.findById(id);

    if (!user) {
      throw new Error("Usuário não encontrado!");
    }

    const token = jwt.sign({ id }, secretJWT, {
      expiresIn: "1h",
    });
    return { token, id, user };
  }
}

export default new UserService();
