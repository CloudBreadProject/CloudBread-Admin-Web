import { Router } from 'express';
import contentApi from './content';

const router = Router();
router.use(contentApi);

export default router;
