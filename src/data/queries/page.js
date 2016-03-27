import {
  StringType,
  NonNull,
} from 'data/types';

import PageType from 'data/types/PageType';

import jade from 'jade';
import fm from 'front-matter';
import { resolve as pathResolve } from 'path';
import { readFile as _readFile, stat } from 'fs';
import { promisify } from 'bluebird';

const CONTENT_DIR = pathResolve(__dirname, './assets/content');

const readFile = promisify(_readFile);
function isExist(file) {
  return new Promise((resolve) => {
    stat(file, (err) => resolve(!err));
  });
}
function parseJade(jadeContent) {
  const fmContent = fm(jadeContent);
  const htmlContent = jade.render(fmContent.body);
  return Object.assign({ content: htmlContent }, fmContent.attributes);
}

const page = {
  type: PageType,
  args: {
    path: { type: new NonNull(StringType) },
  },
  async resolve({}, { path }) {
    const filePath = `${CONTENT_DIR}/${path}.jade`;
    if (!(await isExist(filePath))) throw new Error('requested file does not exist');
    const source = await readFile(filePath, { encoding: 'utf8' });
    const generatedPage = await parseJade(source);
    return {
      ...generatedPage,
      path,
    };
  },
};

export default page;
