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
            res.status(200).json(project);
        })
        .catch(err => {
            res.status(500).json({ error: "The project with the specified ID does not exist" })
        })

});


router.get('/actions/:id', (req, res) => {

    const id = req.params.id;

    projectDb.get(id)
        .then(project => {
            if (project) {
                projectDb.getProjectActions(id)
                    .then(projectActions => {
                        if (projectActions.length > 0) {
                            res.status(200).json(projectActions);
                        } else {
                            res.status(200).json({ message: "This project currently has no actions." });
                        }
                    })
                    .catch(err => {
                        res.status({ error: "The project actions could not be retrieved. Please try again." });
                    });
            } else {
                res.status(500).json({ message: "Something went wrong. Please try again." });
            }
        })
        .catch(err => {
            res.status(500).json({ error: "It appears this project does not exist." });
        })

});


router.post('/', (req, res) => {

    const projectInfo = req.body;

    if (!projectInfo.description || !projectInfo.name) {
        res.status(500).json({ error: "The project was not created. Please ensure you provide a name and description." });
    } else if (projectInfo.name.length > 127) {
        res.status(500).json({ error: "The name must be 128 characters or less." });
    } else {
        projectDb.insert(projectInfo)
            .then(newProject => {
                res.status(201).json({ message: "The project was successfully created", project: newProject });
            })
            .catch(err => {
                res.status(400).json({ error: "There was a problem. The project was not created." })
            })
    }

});


router.put('/:id', (req, res) => {

    const id = req.params.id;
    const changes = req.body;

    if (!changes.name || !changes.description) {
        res.status(500).json({ error: "The project was not modified. Please ensure you provide a name, and description." });
    } else if (changes.name.length > 127) {
        res.status(500).json({ error: "The name must be 128 characters or less." });
    } else {
        projectDb.update(id, changes)
            .then(editedProject => {
                res.status(200).json({ message: "The project was successfully modified", action: editedProject });
            })
            .catch(err => {
                res.status(500).json({ error: "The action information could not be modified. Please try again." })
            })
    }
});


router.delete('/:id', (req, res) => {
    const id = req.params.id;

    projectDb.remove(id)
        .then(count => {
            if (count) {
                res.status(200).json({ message: "The project was successfully removed." });
            } else {
                res.status(404).json({ message: "The project was not removed. Did you provide a valid ID?" });
            }
        })
        .catch(err => {
            res.status(404).json({ message: "The project could not be removed." })
        })

});



module.exports = router;