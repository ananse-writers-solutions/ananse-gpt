import axios from 'axios';
import dotenv from 'dotenv';

import IPrompt from 'src/interfaces/IPrompt';

dotenv.config();

export default async function queryOllama(prompt: string) {
    const url: string = process.env.BOT_URL || 'default_url';
    const model: string = process.env.OLLAMA_MODEL || 'default_model';

    try {
        const response = await axios.post<IPrompt>(url, {
            model: model,
            prompt: prompt,
            stream: false
        });
        return response.data;
    } catch (error) {
        console.error("Erro ao chamar a IA:", error);
        throw new Error("Falha ao conectar com a IA.");
    }
}

