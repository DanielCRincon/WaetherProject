import { Router } from 'express';
import { userController } from '@/controllers/userController';
import { authenticateToken } from '@/middleware/auth';
import { validateRequest } from '@/middleware/validation';
import { userSchemas } from '@/utils/validationSchemas';

const router = Router();

// Public routes
router.post('/register', validateRequest(userSchemas.register), userController.register);
router.post('/login', validateRequest(userSchemas.login), userController.login);
router.post('/refresh', userController.refreshToken);

// Protected routes
router.use(authenticateToken);
router.get('/profile', userController.getProfile);
router.put('/profile', validateRequest(userSchemas.updateProfile), userController.updateProfile);
router.put('/preferences', validateRequest(userSchemas.updatePreferences), userController.updatePreferences);
router.get('/favorites', userController.getFavorites);
router.post('/favorites', validateRequest(userSchemas.addFavorite), userController.addFavorite);
router.delete('/favorites/:id', userController.removeFavorite);
router.post('/logout', userController.logout);

export default router;