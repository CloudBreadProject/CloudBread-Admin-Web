import {
  Schema,
  ObjectType,
} from 'schema/lib';

import page from 'schema/queries/page';

const schema = new Schema({
  query: new ObjectType({
    name: 'Query',
    fields: {
      page,
    },
  }),
});

export default schema;
