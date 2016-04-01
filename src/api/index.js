import { Router } from 'express';
import graphqlHTTP from 'express-graphql';
import schema from 'data';

const router = Router();

router.use(require('cors')());

// bind graphql
router.use('/graphql', graphqlHTTP({
  schema,
  pretty: process.env.NODE_ENV !== 'production',
  graphql: true,
  rootValue: {},
}));

export default router;
