const express = require('express');
const router = express.Router()
const userController = require('../controllers/userController')

router.get('/', userController.list);
router.post('/add', userController.save);
router.get('/delete/:id', userController.delete);
router.post('/search', userController.search);


// Nueva ruta para devolver la lista de personas en formato JSON
router.get('/api/users', (req, res) => {
    req.getConnection((err, connection) => {
        if (err) return res.status(500).json({ error: err.message });

        connection.query('SELECT * FROM users', (err, results) => {
            if (err) return res.status(500).json({ error: err.message });

            // Devuelve los resultados en formato JSON
            res.json(results);
        });
    });
});

module.exports = router;