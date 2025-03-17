import { Router } from 'express';

import { authenticate } from './index';
import storyGeneratorController from '../controllers/StoryGeneratorController';

const controller = storyGeneratorController;

const router = Router();

router.post('/generete-premise', authenticate, controller.premise.bind(controller));
router.post('/generete-worldbuilding', authenticate, controller.worldbuilding.bind(controller));
router.post('/generete-characters', authenticate, controller.characters.bind(controller));
router.post('/generete-plot', authenticate, controller.plot.bind(controller));
router.post('/generete-planStory', authenticate, controller.planStory.bind(controller));

export default router;