import { AuthMiddleware } from '../middlewares/AuthMiddleware';

const authMiddleware = new AuthMiddleware();

const authenticate = authMiddleware.authenticate.bind(authMiddleware);

export { default as auth } from './AuthRoute'
export { default as user } from './UserRoute'



export { authenticate };