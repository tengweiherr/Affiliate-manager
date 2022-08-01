import express from 'express';

import { getCycle, createCycle, updateCycle, deleteCycle } from '../controllers/cycle.js';

import login from '../middleware/login.js';

const router = express.Router();

router.get('/', getCycle);
router.post('/', login, createCycle);
router.patch('/:id', login, updateCycle);
router.delete('/:id', login, deleteCycle);

export default router;