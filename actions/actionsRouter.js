const express = require('express');

const router = express.Router();

const actionDb = require('../data/helpers/actionModel.js');

// endpoints when URL begins with /actions
router.get('/', (req, res) => {

    actionDb.get()
        .then(actions => {
            res.status(200).json(actions);
        })
        .catch(err => {
            res.status(500).json({ error: "The action information could not be retrieved." });
        });

});


router.get('/:id', (req, res) => {

    const id = req.params.id;
    
    actionDb.get(id)
        .then(action => {
            if(action) {
                res.status(200).json(action);
            } else {
                res.status(404).json({ message: "The action with the specified ID does not exist" });
            }
        })
        .catch(err => {
            res.status(500).json({ error: "The action information could not be retrieved." })
        })

});


module.exports = router;