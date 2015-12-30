import { Router } from 'express';
import jade from 'jade';
import fm from 'front-matter';
import { resolve as pathResolve } from 'path';
import { readFile as _readFile, stat } from 'fs';
import { promisify } from 'bluebird';
import greetings from './greetings.json';

const CONTENT_DIR = pathResolve(__dirname, './assets/content');

const readFile = promisify(_readFile);
function isExist(file) {
  return new Promise((resolve) => {
    stat(file, (err) => resolve(err ? false : true));
  });
}
function parseJade(jadeContent) {
  const fmContent = fm(jadeContent);
  const htmlContent = jade.render(fmContent.body);
  return Object.assign({ content: htmlContent }, fmContent.attributes);
}

const router = Router(); // eslint-disable-line new-cap

router.get('/content/:identifier', (req, res) => {
  const filePath = `${CONTENT_DIR}/${req.params.identifier}.jade`;
  (async () => {
    if (!(await isExist(filePath))) {
      return res.status(404).send({ error: 'content you requested is not found' });
    }

    const source = await readFile(filePath, { encoding: 'utf8' });
    const content = await parseJade(source);

    res.status(200).send(content);
  })();
});

router.get('/greetings', (req, res) => {
  const messages = [];
  for (let idx = 0; idx < 30; idx++) {
    messages.push(greetings[Math.floor((Math.random() * greetings.length))]);
  }
  res.status(200).send(messages);
});

export default router;
