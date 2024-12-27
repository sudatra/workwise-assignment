import { Request, Response } from 'express'
import * as userService from '../services/userServices'

export const signup = async (req: Request, res: Response): Promise<void> => {
    try {
        const result = await userService.signup(req.body);
        res.status(201).json(result);
    }
    catch(error) {
        res.status(400).json({ message: (error as Error).message });
    }
}

export const login = async (req: Request, res: Response): Promise<void> => {
    try {
        const result = await userService.login(req.body);
        res.status(201).json(result);
    }
    catch(error) {
        res.status(400).json({ message: (error as Error).message });
    }
}