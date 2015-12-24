import { Router } from 'express';

const router = Router();

router.get('test', (req, res) => {
  res.status(200).send([
    'test', 'test1', 'test2', 'test3',
    'dummy1', 'dummy2', 'dummy3',
  ]);
});

export default router;
