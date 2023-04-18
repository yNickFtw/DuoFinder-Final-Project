import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

const secretJWT = "f358yngi5ng35igfrehptjetjg3292ni";

export function authorizationMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const token = req.headers["authorization"];

    if (!token) {
      return res.status(401).json({ message: "Acesso negado!" });
    }

    const tokenSplited = token.split("Bearer ");

    const decoded = jwt.verify(tokenSplited[1], secretJWT);

    if (!decoded) {
      return res.status(401).json({ message: "Acesso negado!" });
    }

    next();
  } catch (error: any) {
    return res
      .status(401)
      .json({ message: "Ocorreu um erro, tente novamente mais tarde." });
  }
}
