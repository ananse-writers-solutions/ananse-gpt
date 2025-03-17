import { StoryModel } from 'src/models/StoryModel';
import { IStory } from 'src/interfaces/IStory';

const defaultStory: IStory = {
    genre: "",
    theme: "",
    premise: "",
    world: "",
    characters: "",
    plot: "",
    createdAt: new Date()
};

export class StoryGeneratorService {
    public async create(data: IStory) {
        try {
            const story = new StoryModel<IStory>({ ...defaultStory, ...data });
            return await story.save();
        } catch (error) {
            console.log('Error in service: ', error.message);
            return;
        }
    }
}

