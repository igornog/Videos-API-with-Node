import { sql } from './db.js';

sql`
CREATE TABLE videos (
  id TEXT PRIMARY KEY,
  title TEXT,
  description TEXT,
  url TEXT,
  duration INTEGER
)`.then(() => {
  console.log('table created');
});