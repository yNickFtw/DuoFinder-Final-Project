import jwt, { JwtPayload } from "jsonwebtoken";

const secretJWT = "f358yngi5ng35igfrehptjetjg3292ni";

export function getUserIdFromToken(token: string): string | null {
  try {
    const decoded = jwt.verify(
      token.split("Bearer ")[1],
      secretJWT
    ) as JwtPayload;
    return decoded?.id || null;
  } catch {
    return null;
  }
}
