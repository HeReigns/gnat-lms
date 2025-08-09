const express = require('express'); const router = express.Router(); const auth = require('../middleware/auth');
router.get('/courses', auth, async (req,res)=>{ res.json([]); });
module.exports = router;
