
import express from 'express'
import bodyParser from 'body-parser'

import {
  setRange
} from './src/shouty-world.js'

const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Sample data to simulate a database
let messages = [];

// set the range
app.post('/range', (req, res) => {
  const { range } = req.body;

  if (!range) {
    return res.status(400).json({ error: 'Text and author are required' });
  }

  setRange(range)

  res.status(201).json({
    data: range
  });
});

// GET API endpoint
app.get('/messages', (req, res) => {
  res.json(messages);
});

// POST API endpoint
app.post('/messages', (req, res) => {
  const { text, author } = req.body;

  if (!text || !author) {
    return res.status(400).json({ error: 'Text and author are required' });
  }

  const newMessage = {
    id: messages.length + 1,
    text,
    author,
    timestamp: new Date()
  };

  messages.push(newMessage);
  res.status(201).json(newMessage);
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
