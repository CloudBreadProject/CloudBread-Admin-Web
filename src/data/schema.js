import {
  Schema,
  ObjectType,
} from 'data/types';

import page from 'data/queries/page';

const schema = new Schema({
  query: new ObjectType({
    name: 'Query',
    fields: {
      page,
    },
  }),
});

export default schema;
