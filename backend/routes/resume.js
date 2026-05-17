const express = require('express');
const router = express.Router();

router.get('/download', (req, res) => {
  res.send('Resume route working');
});

module.exports = router;