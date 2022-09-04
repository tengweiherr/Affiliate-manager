import express from 'express';

import { getDownline, createDownline, updateDownline, deleteDownline, getDownlineByReferral } from '../controllers/downline.js';

import login from '../middleware/login.js';

const router = express.Router();

router.get('/', getDownline);
router.get('/:referral', getDownlineByReferral);
// router.post('/', login, createDownline);
// router.patch('/:id', login, updateDownline);
// router.delete('/:id', login, deleteDownline);
router.post('/', createDownline);
router.patch('/:id', updateDownline);
router.delete('/:id', deleteDownline);

export default router;