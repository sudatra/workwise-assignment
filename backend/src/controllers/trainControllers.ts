import { Request, Response } from "express";
import * as trainService from '../services/trainServices';

export const getSeats = async (req: Request, res: Response): Promise<void> => {
    try {
        const seats = await trainService.getSeats();
        res.status(201).json(seats);
    }
    catch(error) {
        res.status(500).json({ message: (error as Error).message });
    }
}

export const bookSeats = async (req: Request, res: Response): Promise<void> => {
    try {
        // const userId = req.user?.id as any;
        // if(!userId) {
        //     throw new Error('Unauthorized');
        // }

        const result = await trainService.bookSeats(req.body);
        res.status(201).json(result);
    }
    catch(error) {
        res.status(400).json({ message: (error as Error).message });
    }
}

export const resetSeats = async (req: Request, res: Response): Promise<void> => {
    try {
        await trainService.resetSeats();
        res.status(201).json({ message: "All seats reset" });
    }
    catch(error) {
        res.status(500).json({ message: (error as Error).message });
    }
}