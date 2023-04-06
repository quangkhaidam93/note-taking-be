const express = require("express");

const router = express.Router();
const Note = require("../models/note");

// New Note
router.post("/notes", async (req, res) => {
  if (!req.body) {
    res.send(400).json({ message: "Body is not provided" });
    return;
  }
  const newNote = new Note({
    ...req.body,
  });

  try {
    const savedNote = await newNote.save();
    res.status(201).json(savedNote);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

//Get all Notes
router.get("/notes", async (req, res) => {
  try {
    const allNotes = await Note.find().sort({ updatedAt: -1 });

    res.status(200).json(allNotes);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

//Get Note by ID
router.get("/notes/:id", async (req, res) => {
  const { id } = req.params;

  if (!id) {
    res.status(404).json({ message: "No note id provided" });
    return;
  }

  try {
    const note = await Note.findById(id);
    res.status(200).json(note);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//Update Note by ID
router.patch("/notes/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;
    const options = { new: true };

    const result = await Note.findByIdAndUpdate(id, updatedData, options);

    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//Delete Note by ID
router.delete("/notes/:id", async (req, res) => {
  const { id } = req.params;

  if (!id) {
    res.status(404).json({ message: "No note id provided" });
    return;
  }

  try {
    const deletedNote = await Note.findByIdAndDelete(id);
    if (deletedNote) {
      res.send(`Note ${deletedNote.title} has been deleted..`);
    } else {
      res.send({ message: `Cannot find note with id ${id}` });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
