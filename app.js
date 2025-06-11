console.log("Starter server..."); //skjekke om serveren starter! husk å starte fra vm-en.

const express = require('express');
const { fåTags } = require('./dbconnector');
const app = express();

app.use(express.json());
app.use(express.static('public'));

app.get('/api/tags', async (req, res) => { //for å sjekke tagsene! (fjerner senere når i bruk)
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
}); //for å skjekke om den svarer
