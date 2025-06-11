console.log("Starter server...");

const express = require('express');
const { fåTags } = require('./dbconnector');
const app = express();

app.use(express.json());
app.use(express.static('public'));

app.get('/api/tags', async (req, res) => {
  try {
    const tags = await fåTags();
    res.json(tags);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Feil ved henting av tags' });
  }
});

app.listen(3000, '0.0.0.0', () => {
  console.log('Server kjører på http://localhost:3000');
});
