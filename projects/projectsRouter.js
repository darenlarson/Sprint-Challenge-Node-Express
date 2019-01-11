const express = require('express');

const router = express.Router();

const projectDb = require('../data/helpers/projectModel.js');

// endpoints when URL begins with /projects
router.get('/', (req, res) => {

    projectDb.get()
        .then(projects => {
            res.status(200).json(projects);
        })
        .catch(err => {
            res.status(500).json({ error: "The project information could not be retrieved." });
        });

});


router.get('/:id', (req, res) => {

    const id = req.params.id;
    
    projectDb.get(id)
        .then(project => {
            if(project) {
                res.status(200).json(project);
            } else {
                res.status(404).json({ message: "The project with the specified ID does not exist" });
            }
        })
        .catch(err => {
            res.status(500).json({ error: "The project information could not be retrieved." })
        })

});


router.post('/', (req, res) => {

    const projectInfo = req.body;

    projectDb.insert(projectInfo)
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

    projectDb.update(id, changes)
        .then(result => {
            res.status(200).json(result);
        })
        .catch(err => {
            res.status(500).json({ error: "The project information could not be modified." })
        })

});


router.delete('/:id', (req, res) => {
    const id = req.params.id;

    projectDb.remove(id)
        .then(count => {
            res.status(200).json({ message: 'The project has been removed' });
        })
        .catch(err => {
            res.status(404).json({ message: "The project could not be removed." })
        })

});



module.exports = router;