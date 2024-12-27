import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/jwtUtils";
import { JWTPayload } from "../interfaces/userInterfaces";

export const authenticate = (req: Request, res: Response, next: NextFunction): void => {
    const token = req.headers.authorization?.split(' ')[1];
    if(!token) {
        res.status(401).json({ message: "Token not found" });
    }

    try {
        const decoded = verifyToken(token as string, process.env.JWT_SECRET as string) as JWTPayload
        // req.user = decoded;
        next()
    }
    catch(error) {
        res.status(401).json({ message: "Invalid or expired token" });
    }
}