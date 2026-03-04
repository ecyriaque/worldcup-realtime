import { Request, Response, NextFunction } from "express";
import { config } from "../config";

export function requireApiKey(
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    res.status(401).json({
      message: "Unauthorized: API key required",
      hint: "Include 'Authorization: Bearer <API_KEY>' header",
    });
    return;
  }

  const parts = authHeader.split(" ");
  if (parts.length !== 2 || parts[0] !== "Bearer") {
    res.status(401).json({
      message: "Unauthorized: Invalid authorization format",
      hint: "Use 'Authorization: Bearer <API_KEY>'",
    });
    return;
  }

  const token = parts[1];

  if (token !== config.apiKey) {
    res.status(403).json({
      message: "Forbidden: Invalid API key",
    });
    return;
  }
  next();
}

/**
 * Middleware optionnel : logguer les accès protégés
 */
export function logProtectedAccess(
  req: Request,
  _res: Response,
  next: NextFunction,
): void {
  console.log(`🔒 Protected access: ${req.method} ${req.path} from ${req.ip}`);
  next();
}
