import { Router, Request, Response } from "express";
import BotController from "../controllers/BotController";

const router = Router();
const controller = BotController;

// Rota para iniciar o bot
router.get("/bot/start", (_req: Request, res: Response) => {
    controller.start();
    res.status(200).json({ message: "🤖 Bot iniciado com sucesso!" });
});

export default router;
