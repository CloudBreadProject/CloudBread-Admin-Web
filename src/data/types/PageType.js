import {
  NonNull,
  ObjectType,
  StringType,
} from 'data/types';

const ContentType = new ObjectType({
  name: 'Page',
  description: 'serves html content from formatted documents such as jade',
  fields: {
    path: { type: new NonNull(StringType) },
    title: { type: new NonNull(StringType) },
    content: { type: new NonNull(StringType) },
  },
});

export default ContentType;
