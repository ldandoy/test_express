const express = require('express');

const userCtrl = require('../controllers/users');

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const users = await userCtrl.getAll();
        res.status(200).json(users);
    } catch(error) {
        res.status(500).json({"error": error.message});
    }
});

router.post('/', async (req, res) => {
    if (typeof req.body == 'undefined') {
        return res.status(500).json({"error": "Aucune donnée reçu !"});
    }

    const {email, password} = req.body;

    try {
        await userCtrl.insertOne(email, password);
        res.status(201).json({"message": "User bien créé !"});
    } catch(error) {
        res.status(500).json({"error": error.message});
    }
});

module.exports = router;