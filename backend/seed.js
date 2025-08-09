const { Pool } = require('pg');
const bcrypt = require('bcrypt');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

async function seed() {
  const passwordHash = await bcrypt.hash('password123', 10);

  await pool.query(`
    INSERT INTO users (name, email, password, role) VALUES
    ('Admin User', 'admin@example.com', '${passwordHash}', 'admin'),
    ('Instructor User', 'instructor@example.com', '${passwordHash}', 'instructor'),
    ('Student User', 'student@example.com', '${passwordHash}', 'student')
    ON CONFLICT (email) DO NOTHING;
  `);

  console.log('Seed data inserted');
  await pool.end();
}

seed().catch(err => console.error(err));
