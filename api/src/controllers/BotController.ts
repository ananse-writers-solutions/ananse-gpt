import { Client, GatewayIntentBits, Message, TextChannel, NewsChannel, ThreadChannel } from 'discord.js';
import dotenv from 'dotenv';

import queryOllama from "../utils/Ollama";

dotenv.config();

class BotController {
    private client: Client;

    constructor() {
        this.client = new Client({
            intents: [
                GatewayIntentBits.Guilds,
                GatewayIntentBits.GuildMessages,
                GatewayIntentBits.MessageContent,
            ],
        });

        this.initialize();
    }

    private initialize(): void {
        this.client.once('ready', () => {
            console.log(`🤖 Bot logado como ${this.client.user?.tag}`);
        });

        this.client.on('messageCreate', async (message: Message) => {
            await this.handleMessage(message);
        });
    }

    public start(): void {
        this.client.login(process.env.DISCORD_BOT_TOKEN); 
    }

    public async promptStory(prompt: string, message: Message, text: string){
        const ollama = await queryOllama(prompt);
        console.log("Resposta do Ollama:", ollama);        
        const response = ollama.response;
        console.log("Premissa gerada:", response);
        if (message.channel instanceof TextChannel || message.channel instanceof NewsChannel || message.channel instanceof ThreadChannel) {
            await this.sendLongMessage(message.channel, `${text} ${response}`);
            return response;
        } else {
            const error = "O canal não suporta envio de mensagens."
            console.error(error);
            return error;
        }
    }

    private async handleMessage(message: Message): Promise<void> {
        if (message.author.bot) return;

        if (message.content.startsWith('!historia')) {
            const args = message.content.split(' ').slice(1);
            const genre = args[0] || "fantasia";
            const theme = args.slice(1).join(' ') || "batalha entre forças antigas";

            try {
                const prompt_premise: string = `Crie uma premissa para uma história de literatura fantástica no gênero ${genre} com o tema ${theme}.`;
                const premise = await this.promptStory(prompt_premise, message, "📖 **Premissa da História:**");

                const prompt_worldbuilding: string = `Com base na seguinte premissa, crie um mundo detalhado, incluindo cultura, geografia e conflitos: ${premise}.`;
                const worldbuilding = await this.promptStory(prompt_worldbuilding, message, "📖 **Worldbuilding da História:**");

                const prompt_characters : string = `Baseado na seguinte premissa, crie três personagens principais, com nomes, personalidades e motivações: ${premise}.`;
                const characters = await this.promptStory(prompt_characters, message, "📖 **Personagens da História:**");

                const prompt_plot: string = `Crie um enredo completo baseado na premissa: ${premise}, no mundo: ${worldbuilding}, e nos personagens: ${characters}.`;
                const plot = await this.promptStory(prompt_plot, message, "📖 **Enredo da História:**");
                console.log("Enredo gerado:", plot);
            } catch (error) {
                console.error("Erro ao gerar a premissa:", error);
                if (message.channel instanceof TextChannel || message.channel instanceof NewsChannel || message.channel instanceof ThreadChannel) {
                    message.channel.send("❌ Ocorreu um erro ao gerar a premissa.");
                }
            }
        }
    }   
    
    private async sendLongMessage(channel: TextChannel | NewsChannel | ThreadChannel, text: string): Promise<void> {
        const maxLength = 2000;
        let parts = [];
    
        while (text.length > 0) {
            parts.push(text.slice(0, maxLength));
            text = text.slice(maxLength);
        }
    
        for (const part of parts) {
            await channel.send(part);
        }
    }
}

export default new BotController();