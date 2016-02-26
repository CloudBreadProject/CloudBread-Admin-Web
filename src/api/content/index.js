import { Router } from 'express';
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

const router = Router();

router.get('/content/:identifier', async (req, res) => {
  const filePath = `${CONTENT_DIR}/${req.params.identifier}.jade`;
  if (!(await isExist(filePath))) {
    return res.status(404).send({ error: 'content you requested is not found' });
  }

  const source = await readFile(filePath, { encoding: 'utf8' });
  const content = await parseJade(source);

  return res.status(200).send(content);
});

export default router;
