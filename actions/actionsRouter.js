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
            res.status(200).json(action);
        })
        .catch(err => {
            res.status(404).json({ error: "The action for the provided ID could not be found." });
        })

});

router.post('/', (req, res) => {

    const actionInfo = req.body;

    if (!actionInfo.project_id || !actionInfo.description || !actionInfo.notes) {
        res.status(500).json({ error: "The action was not created. Please ensure you provide a project ID, description, and notes." });
    } else if (actionInfo.description.length > 128) {
        res.status(500).json({ error: "The description must be 128 characters or less." });
    } else {
        actionDb.insert(actionInfo)
            .then(newAction => {
                res.status(201).json({ message: "The action was successfully created", action: newAction });
            })
            .catch(err => {
                res.status(400).json({ error: "There was a problem. The action was not created. Please try again." });
            })
    }
});


router.put('/:id', (req, res) => {

    const id = req.params.id;
    const changes = req.body;

    if (!changes.project_id || !changes.description || !changes.notes) {
        res.status(500).json({ error: "The action was not modified. Please ensure you provide a project ID, description, and notes." });
    } else if (changes.description.length > 128) {
        res.status(500).json({ error: "The description must be 128 characters or less." });
    } else {
        actionDb.update(id, changes)
            .then(editedAction => {
                res.status(200).json({ message: "The action was successfully modified", action: editedAction });
            })
            .catch(err => {
                res.status(500).json({ error: "The action information could not be modified. Please try again." })
            })
    }

})


router.delete('/:id', (req, res) => {
    const id = req.params.id;
    let deletedAction = {};

    actionDb.get(id)
        .then(action => {
            deletedAction = action;
            
            actionDb.remove(id)
                .then(count => {
                    res.status(200).json({ message: "This action has been removed", removedAction: deletedAction });
                })
                .catch(err => {
                    res.status(404).json({ message: "The action could not be removed." })
                })
        })
        .catch(err => {
            res.status(404).json({ error: "The action for the provided ID could not be found." });
        })


});



module.exports = router;