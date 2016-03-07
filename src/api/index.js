import { Router } from 'express';
import graphqlHTTP from 'express-graphql';
import schema from 'schema';

const router = Router();

router.use('/graphql', graphqlHTTP({
  schema,
  pretty: process.env.NODE_ENV !== 'production',
  graphql: true,
  rootValue: {},
}));

export default router;
