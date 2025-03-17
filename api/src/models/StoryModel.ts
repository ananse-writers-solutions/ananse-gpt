import mongoose from 'mongoose';
import { IStory } from '../interfaces/IStory';

const storySchema = new mongoose.Schema<IStory>({
    genre: String,
    theme: String,
    premise: String,
    world: String,
    characters: String,
    plot: String,
    createdAt: { type: Date, default: Date.now }
});


export const StoryModel = mongoose.model('Story', storySchema);
