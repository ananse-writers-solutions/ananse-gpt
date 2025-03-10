import os
import discord
from discord.ext import commands
from langchain_ollama import ChatOllama  # Novo pacote correto para o Ollama
from langchain_core.runnables.history import RunnableWithMessageHistory
from langchain_community.chat_message_histories import ChatMessageHistory
from dotenv import load_dotenv

# Carregar variáveis de ambiente
load_dotenv()

# Configurar o modelo Qwen via Ollama
llm = ChatOllama(model="qwen2.5")

# Criar um dicionário para armazenar históricos de conversação por usuário
user_histories = {}

# Função para obter o histórico de um usuário
def get_session_history(user_id):
    if user_id not in user_histories:
        user_histories[user_id] = ChatMessageHistory()
    return user_histories[user_id]

# Criar a cadeia de conversação com histórico
conversation = RunnableWithMessageHistory(
    runnable=llm,
    get_session_history=get_session_history
)

# Configurar bot do Discord
intents = discord.Intents.default()  # Usa apenas intents padrão
intents.message_content = True  # Apenas essa linha é necessária

bot = commands.Bot(command_prefix="!", intents=intents)


# Evento de inicialização
@bot.event
async def on_ready():
    print(f"✅ Bot conectado como {bot.user}")

# Responder mensagens no Discord com a IA local
@bot.event
async def on_message(message):
    if message.author == bot.user:
        return

    # Obter histórico do usuário e passar para o modelo
    response = conversation.invoke(message.content, config={"configurable": {"session_id": str(message.author.id)}})

    await message.channel.send(response)

    # Processar comandos normalmente
    await bot.process_commands(message)

# Rodar o bot
TOKEN = os.getenv("DISCORD_BOT_TOKEN")
if not TOKEN:
    raise ValueError("❌ ERRO: A variável DISCORD_BOT_TOKEN não está definida no arquivo .env!")

bot.run(TOKEN)
