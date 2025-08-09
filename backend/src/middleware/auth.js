const jwt = require('jsonwebtoken'); const JWT_SECRET = process.env.JWT_SECRET || 'dev_secret';
module.exports = (req, res, next) => {
  const auth = req.headers.authorization;
  if(!auth) return res.status(401).json({ error: 'missing' });
  const parts = auth.split(' ');
  if(parts.length!==2) return res.status(401).json({ error: 'bad' });
  try{ const payload = jwt.verify(parts[1], JWT_SECRET); req.user = payload; next(); } catch(e){ return res.status(401).json({ error: 'invalid' }); }
};
