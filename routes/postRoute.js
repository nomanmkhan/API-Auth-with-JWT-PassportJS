const express = require('express');
const router = express.Router();

router.get('/post', (req,res) => {
    res.json('Cant access without token validation');
});

module.exports = router;