import express from "express";
import dotenv from "dotenv";

import { Connection } from "./database/Connection";
import router from "./router";

dotenv.config();

export class App {
    public server: express.Application;
    private port: number = Number(process.env.PORT) || 4000;

    constructor() {
        this.server = express();
        this.middleware();
        this.routes();
    }

    private middleware() {
        this.server.use(express.json());
    }

    private routes() {
        this.server.use(router);
    }

    private async connection() {
        await Connection.connect();
    }

    public async start() {
        await this.connection();
        this.server.listen(this.port, async () => {
            console.log(`🚀 Server running on port ${this.port}`);
            await this.startBotAutomatically();
        });
    }

    private async startBotAutomatically() {
        try {
            const response = await fetch(`http://localhost:${this.port}/bot/start`);
            const data = await response.json();
            console.log("🤖 Bot iniciado automaticamente:", data.message);
        } catch (error) {
            console.error("❌ Erro ao iniciar o bot automaticamente:", error);
        }
    }
}
