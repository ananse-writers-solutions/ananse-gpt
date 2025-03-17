export default interface IPrompt {
    model: string,
    prompt: string,
    stream: boolean,
    content: string;
    response: string;
}