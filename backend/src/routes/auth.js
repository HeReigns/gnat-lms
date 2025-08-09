const express = require('express');
const router = express.Router();
const prisma = require('../lib/prisma');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || 'dev_secret';

router.post('/register', async (req, res) => {
  const { email, password } = req.body;
  if(!email || !password) return res.status(400).json({ error: 'email+password required' });
  const h = await bcrypt.hash(password, 10);
  const u = await prisma.user.create({ data: { email, password: h } });
  res.json({ id: u.id, email: u.email });
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const u = await prisma.user.findUnique({ where: { email } });
  if(!u) return res.status(401).json({ error: 'invalid' });
  const ok = await bcrypt.compare(password, u.password);
  if(!ok) return res.status(401).json({ error: 'invalid' });
  const token = jwt.sign({ sub: u.id, role: u.role }, JWT_SECRET, { expiresIn: '8h' });
  res.json({ token });
});

module.exports = router;
