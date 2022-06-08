import express from 'express';
import bcryptjs from 'bcryptjs';
import fs from 'fs';
import { promisify } from 'util';
const app = express();

app.get('/readfile/sync', async (req, res) => {
  const salt = bcryptjs.genSalt(12);
  res.send(salt);
});

app.get('/readfile/async', async (req, res) => {
  const salt = await bcryptjs.genSalt(12);
  res.send(salt);
});

const filePath = ''; // fill your file path here 200,000+ kb is recomended

app.get('/readfile/sync', async (req, res) => {
  const file = fs.readFileSync(filePath);
  res.send(file.toString());
});

app.get('/readfile/async', async (req, res) => {
  const readFilePromise = promisify(fs.readFile);
  const file = await readFilePromise(filePath);
  res.send(file.toString);
});

app.get('/', async (req, res) => {
  res.send('Hello World');
});

app.listen(3000, () => {
  console.log('server running on port 3000');
});
