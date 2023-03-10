import { Router } from 'express';
import { guestController } from '../controller';
import { asyncHandler } from '../utils';

export const guestRouter = Router();

guestRouter.post('/', asyncHandler(guestController.register));
