const router = require('express').Router();

router.get('/notes', (req, res) => {
    res.send('notas desde base de datos');
})

module.exports = router;