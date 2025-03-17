
export interface OllamaResponse {
    id: string;
    model: string;
    object: string;
    created: number;
    choices: OllamaChoice[];
    data: [];
}

export interface OllamaChoice {
    text: string;
    index: number;
    logprobs: OllamaLogProbs;
}

export interface OllamaLogProbs {
    tokens: OllamaToken[];
}

export interface OllamaToken {
    token: string;
    token_logprobs: number;
}
