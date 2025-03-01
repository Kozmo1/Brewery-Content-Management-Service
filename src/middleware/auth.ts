import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { config } from "../config/config";

export interface AuthRequest extends Request {
    user?: {id: string; email: string};
}

export const verifyToken = (req: AuthRequest, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
        res.status(403).send({ message: "A token is required for authentication" });
        return;
    }
    try {
        const decoded = jwt.verify(token, config.jwtSecret) as {id: string; email: string};
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).send({ message: "Invalid token" });
    }
};