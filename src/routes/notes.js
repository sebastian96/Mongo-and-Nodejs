const router = require('express').Router();
const Note = require('../models/Note');

router.get('/notes', async(req, res) => {
    const notes = await Note.find().sort({date: 'desc'});
    res.render('notes/all-notes', { notes });
});

router.get('/notes/new-note', (req, res) => {
    res.render('notes/new-note');
});

router.post('/notes/add-note', async(req, res) => {
    const { title, description } = req.body;
    const errors = [];

    if (!title) {
        errors.push({ text: 'Please write a title.' });
    }
    if (!description) {
        errors.push({ text: 'Please write a description.' });
    }
    if (errors.length > 0) {
        res.render('notes/new-note', {
            errors,
            title,
            description
        })
    } else {
        const newNote = new Note({
            title,
            description
        });
        await newNote.save();
        res.redirect('/notes');
    }
});

router.get('/notes/edit/:id', async(req, res) => {
    const note = await Note.findById(req.params.id);
    res.render('notes/edit-note', { note });
});

router.put('/notes/edit-note/:id', async (req, res) => {
    const { title, description } = req.body;
    await Note.findByIdAndUpdate(req.params.id, { title, description });
    res.redirect('/notes');
});

router.delete('/notes/delete-note/:id', async (req, res) => {
    await Note.findByIdAndDelete(req.params.id);
    res.redirect('/notes');
})




module.exports = router;