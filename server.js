
import express from 'express'
import bodyParser from 'body-parser'

import {
  setRange,
  newPerson,
  addPersonInNetwork,
  shout,
  isPersonInRange,
  getMessage,
  getPersonHeardmMessages,

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
    return res.status(400).json({ error: 'Range is required' });
  }

  setRange(range)

  console.log('================= Set Range', range)

  res.status(201).json({
    data: 'success'
  });
});

app.post('/person/add', (req, res) => {
  const { name, location } = req.body;

  if (!name || !location) {
    return res.status(400).json({ error: 'Name and location are required' });
  }

  newPerson({ name, location });

  console.log('================= Add person', name)

  res.status(201).json({
    data: 'success'
  });
});

app.post('/network/person-add', (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ error: 'Name is required' });
  }

  addPersonInNetwork({ name });


  console.log('================= Add network person', name)
  res.status(201).json({
    data: 'success'
  });
});

app.post('/shout', (req, res) => {
  const { from, message } = req.body;

  console.log("shout from: ", from, message)

  if (!from || !message) {
    return res.status(400).json({ error: 'From(Shouter) and Message are required' });
  }

  shout({ from, message });
  res.status(201).json({
    data: 'success'
  });
});

app.get('/person/in-range/:name', (req, res) => {
  const name = req.params.name;

  if (!name) {
    return res.status(400).json({ error: 'Name (Person Name) is required' });
  }
 
  const ret = isPersonInRange(name)
  res.status(201).json({
    data: ret
  });
});

app.get('/message', (req, res) => {

  const ret = getMessage()

  console.log('message:', ret)

  res.status(201).json({
    data: ret || ''
  });
});

app.get('/person/heard-messages/:name', (req, res) => {

  const name = req.params.name;
  if (!name) {
    return res.status(400).json({ error: 'Name (Person Name) is required' });
  }

  const ret = getPersonHeardmMessages(name)

  console.log('heard message', ret, name)

  res.status(201).json({
    data: ret | []
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
