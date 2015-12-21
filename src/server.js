import express from 'express';

const app = express();

app.get('/', (req, res) => {
  res.status(200).send('Hello World');
});

const server = app.listen(process.env.PORT || 5000, () => {
  const { port } = server.address();
  console.log(`The server is listening at http://localhost:${port}`);
  if (__DEV__) {
    console.log('__DEV_START__');
  }
});
