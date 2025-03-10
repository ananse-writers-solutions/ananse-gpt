import { Router } from 'express';
import AuthController from '../controllers/AuthController';

const router = Router();

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Log in a user
 *     description: Validates the user's email and password and returns a JWT token if successful.
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: user@example.com
 *               password:
 *                 type: string
 *                 example: securePassword123
 *     responses:
 *       200:
 *         description: Successfully logged in
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *       401:
 *         description: Invalid credentials
 *       500:
 *         description: Internal server error
 */
router.post('/login', AuthController.login.bind(AuthController));

/**
 * @swagger
 * /verify-token:
 *   get:
 *     summary: Verify a JWT token
 *     description: Checks if the provided JWT token is valid and not expired.
 *     tags:
 *       - Authentication
 *     responses:
 *       200:
 *         description: Valid token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Valid token
 *                 decoded:
 *                   type: object
 *       401:
 *         description: Token invalid or expired
 *       500:
 *         description: Internal server error
 */
router.get('/verify-token', AuthController.verifyToken.bind(AuthController));

export default router;
