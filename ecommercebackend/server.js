const express = require('express');
const app = express();

app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'Server is running!' });
});

module.exports = app;
