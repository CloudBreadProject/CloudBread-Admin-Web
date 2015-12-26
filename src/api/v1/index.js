import { Router } from 'express';
import jade from 'jade';
import fm from 'front-matter';
import { resolve } from 'path';
import { readFile as _readFile, stat } from 'fs';
import { promisify } from 'bluebird';
import wrap from './lib/wrap';

const CONTENT_DIR = resolve(__dirname, './assets/content');

const readFile = promisify(_readFile);
function isExist(file) {
  return new Promise((resolve, reject) => {
    stat(file, (err) => err ? resolve(false) : resolve(true));
  });
}
function parseJade(jadeContent) {
  const fmContent = fm(jadeContent);
  const htmlContent = jade.render(fmContent.body);
  return Object.assign({ content: htmlContent }, fmContent.attributes);
}

const router = Router();

router.get('/content/:identifier', (req, res) => {
  const filePath = `${CONTENT_DIR}/${req.params.identifier}.jade`;
  (async () => {
    if (!(await isExist(filePath))) {
      return res.status(404).send({error: 'content you requested is not found'});
    }

    const source = await readFile(filePath, { encoding: 'utf8' });
    const content = await parseJade(source);

    res.status(200).send(content);
  })();
});

export default router;
