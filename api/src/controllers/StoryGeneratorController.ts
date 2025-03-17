import { Request, Response } from "express";
import axios from "axios";
import dotenv from "dotenv";

import { IStory } from "src/interfaces/IStory";

import queryOllama from "src/utils/Ollama";

import { StoryGeneratorService } from "src/services/storyGeneratorService";

dotenv.config();
const service = new StoryGeneratorService();

const defaultStory = {
    genre: "",
    theme: "",
    premise: "",
    world: "",
    characters: "",
    plot: "",
    createdAt: new Date()
};

class HistoryGeneratorController {    

    public async premise(req: Request, res: Response) {
        try {
            const { genre, theme } = req.body;
            const prompt: string = `Crie uma premissa para uma história de literatura fantástica no gênero ${genre} com o tema ${theme}.`;
            const ollama = await queryOllama(prompt);
            const data: IStory = { ...defaultStory, premise: ollama.content };
            const premise = await service.create(data);
            res.status(201).json({ premise });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    public async worldbuilding(req: Request, res: Response) {
        try {
            const { premise } = req.body;
            const prompt = `Com base na seguinte premissa, crie um mundo detalhado, incluindo cultura, geografia e conflitos: ${premise}.`;
            const world = await queryOllama(prompt);
            res.status(201).json({ world });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    public async characters(req: Request, res: Response) {
        try {
            const { premise } = req.body;
            const prompt = `Baseado na seguinte premissa, crie três personagens principais, com nomes, personalidades e motivações: ${premise}.`;
            const characters = await queryOllama(prompt);
            res.status(201).json({ characters });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    public async plot(req: Request, res: Response) {
        try {
            const { premise, world, characters } = req.body;
            const prompt = `Crie um enredo completo baseado na premissa: ${premise}, no mundo: ${world}, e nos personagens: ${characters}.`;
            const plot = await queryOllama(prompt);
            res.status(201).json({ plot });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    public async planStory(genre: string, theme: string) {
        try {
            // ⿡ Gerar Premissa
            let response = await axios.post('http://localhost:3000/generate-premise', { genre, theme });
            const premise = response.data.premise;
            console.log("\n📖 Premissa:", premise);

            // ⿢ Criar Mundo
            response = await axios.post('http://localhost:3000/generate-worldbuilding', { premise });
            const world = response.data.world;
            console.log("\n🌍 Mundo:", world);

            // ⿣ Criar Personagens
            response = await axios.post('http://localhost:3000/generate-characters', { premise });
            const characters = response.data.characters;
            console.log("\n👤 Personagens:", characters);

            // ⿤ Criar Enredo
            response = await axios.post('http://localhost:3000/generate-plot', { premise, world, characters });
            const plot = response.data.plot;
            console.log("\n📜 Enredo:", plot);
        } catch (error) {
            console.error("❌ Erro ao planejar história:", error.message);
        }
    }
}

export default new HistoryGeneratorController();