import { Router } from 'express';

import { authenticate } from './index';
import userController from '../controllers/UserController';

const router = Router();

/**
 * @openapi
 * /api/users:
 *   post:
 *     summary: Cria um novo usuários
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               celular:
 *                 type: string
 *               active:
 *                 type: boolean
 *               role:
 *                 type: string
 *     responses:
 *       201:
 *         description: Usuário criado com sucesso
 *       400:
 *         description: Erro na criação do usuário
 */
router.post('/users', userController.create.bind(userController));

/**
 * @openapi
 * /api/users:
 *   get:
 *     summary: Obtém a lista de todos os usuários
 *     tags:
 *       - Users
 *     responses:
 *       200:
 *         description: Lista de usuários
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   name:
 *                     type: string
 *                   email:
 *                     type: string
 *                   password:
 *                     type: string
 *                   celular:
 *                     type: string
 *                   active:
 *                     type: boolean
 *                   role:
 *                     type: string
 */
router.get('/users', userController.get.bind(userController));

/**
 * @openapi
 * /api/users/{id}:
 *   get:
 *     summary: Obtém um usuário pelo ID
 *     tags:
 *       - Users
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Dados do usuário
 *         content:
 *           application/json:
 *             schema:
 *                   id:
 *                     type: string
 *                   name:
 *                     type: string
 *                   email:
 *                     type: string
 *                   password:
 *                     type: string
 *                   celular:
 *                     type: string
 *                   active:
 *                     type: boolean
 *                   role:
 *                     type: string
 *       404:
 *         description: Usuário não encontrado
 */
router.get('/users/:id', userController.getUser.bind(userController));

/**
 * @openapi
 * /api/users/{id}:
 *   put:
 *     summary: Atualiza um usuário pelo ID
 *     tags:
 *       - Users
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               celular:
 *                 type: string
 *               active:
 *                 type: boolean
 *               role:
 *                 type: string
 *     responses:
 *       200:
 *         description: Usuário atualizado com sucesso
 *       400:
 *         description: Erro na atualização do usuário
 *       403:
 *         description: Proibido
 *       404:
 *         description: Usuário não encontrado
 *     security:
 *       - bearerAuth: []
 */
router.put('/users/:id', authenticate, userController.update.bind(userController));

/**
 * @openapi
 * /api/users/{id}:
 *   delete:
 *     summary: Deleta um usuário pelo ID
 *     tags:
 *       - Users
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Usuário deletado com sucesso
 *       404:
 *         description: Usuário não encontrado
 *     security:
 *       - bearerAuth: []
 */
router.delete('/users/:id', authenticate, userController.delete.bind(userController));

export default router;
