const mariadb = require('mariadb');

const pool = mariadb.createPool({
  host: 'localhost', //ip-en til ubuntu vm 172.31.1.72
  user: 'matilde',
  password: '1487',
  database: 'bakeside',
  connectionLimit: 10
});

async function fåTags() {
  let conn;
  try {
    conn = await pool.getConnection();
    const rows = await conn.query('SELECT * FROM tags ORDER BY name'); //sorteres på alfabetisk rekkefølge
    return rows;
  } finally {
    if (conn) conn.release(); //slipper tilkoblingen tilbake til poolen
  }
}

module.exports = {pool, fåTags};
