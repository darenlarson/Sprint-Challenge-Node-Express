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

router.post('/', (req, res) => {

    const actionInfo = req.body;

    actionDb.insert(actionInfo)
        .then(result => {
            res.status(201).json(result);
        })
        .catch(err => {
            res.status(400).json({ error: "There was a problem..."})
        })
});


router.put('/:id', (req, res) => {

    const id = req.params.id;
    const changes = req.body;

    actionDb.update(id, changes)
        .then(result => {
            res.status(200).json(result);
        })
        .catch(err => {
            res.status(500).json({ error: "The action information could not be modified." })
        })

})


router.delete('/:id', (req, res) => {
    const id = req.params.id;

    actionDb.remove(id)
        .then(count => {
            res.status(200).json({ message: 'The action has been removed' });
        })
        .catch(err => {
            res.status(404).json({ message: "The action could not be removed." })
        })

});



module.exports = router;