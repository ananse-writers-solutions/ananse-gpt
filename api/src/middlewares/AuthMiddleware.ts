import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export class AuthMiddleware {
  private readonly jwtSecret: string;

  constructor() {
    const secret = process.env.JWT_SECRET;
    if (!secret) {
      throw new Error("JWT_SECRET is not defined in environment variables.");
    }
    this.jwtSecret = secret;
  }

  public authenticate(req: Request, res: Response, next: NextFunction): void {
    const authHeader = req.headers['authorization'];

    if (!authHeader) {
      res.status(401).json({ message: 'Not authorization.' });
      return;
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
      res.status(401).json({ message: 'Token not provided.' });
      return;
    }

    try {
      const decoded = jwt.verify(token, this.jwtSecret);
      (req as any).user = decoded;
      next();
    } catch (error) {
      res.status(401).json({
        name: error.name,
        message: `Invalid or expired token - ${error.message}`,
        stack: error.stack,
      });
    }
  }
}
