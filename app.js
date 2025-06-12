console.log("Starter server >:)"); //skjekke om serveren starter! husk å starte fra vm-en.

const express = require('express');
const { fåTags, pool } = require('./dbconnector');
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

app.get('/api/recipes', async (req, res) => { //tag systemet.
  try {
    const conn = await pool.getConnection();

    const rows = await conn.query(`
      SELECT 
        r.id AS recipe_id,
        r.title,
        r.description,
        r.img,
        r.link,
        t.id AS tag_id,
        t.name AS tag_name
      FROM recipes r
      LEFT JOIN recipe_tags rt ON r.id = rt.recipe_id
      LEFT JOIN tags t ON rt.tag_id = t.id
    `);

    const recipesMap = new Map();

    for (const row of rows) {
      if (!recipesMap.has(row.recipe_id)) {
        recipesMap.set(row.recipe_id, {
          id: row.recipe_id,
          title: row.title,
          description: row.description,
          img: row.img,
          link: row.link,
          tags: []
        });
      }
      if (row.tag_id) {
        recipesMap.get(row.recipe_id).tags.push({
          id: row.tag_id,
          name: row.tag_name
        });
      }
    }

    res.json(Array.from(recipesMap.values()));
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Feil ved henting av oppskrifter' });
  }
});



app.listen(3000, '0.0.0.0', () => {
  console.log('Server kjører på http://localhost:3000');
}); //for å skjekke om den svarer
