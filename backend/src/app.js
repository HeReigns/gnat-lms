const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const authRoutes = require('./routes/auth');
const districtRoutes = require('./routes/districts');
const lmsRoutes = require('./routes/lms');
const ltiRoutes = require('./routes/lti');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use('/api/auth', authRoutes);
app.use('/api/districts', districtRoutes);
app.use('/api/lms', lmsRoutes);
app.use('/lti', ltiRoutes);

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/assets', express.static(path.join(__dirname, '../assets')));

module.exports = app;
