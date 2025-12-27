const express = require("express");
const router = express.Router();
const Note = require("../models/Note");
const { body, validationResult } = require("express-validator");
const fetchuser = require("../middleware/fetchuser");

// ROUTE 1: getting all notes of the user: GET '/api/note/fetchallnotes. login required
router.get("/fetchallnotes", fetchuser, async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    console.log(error.message);
    res.status(500).json("some error occured");
  }
});

// ROUTE 2: adding new notes: POST '/api/note/addnote. login required
router.post(
  "/addnote",
  fetchuser,
  [
    body("title", "Title must be required").isLength({ min: 1 }),
    body("description", "Enter description").isLength({ min: 3 }),
    body("tag", "Enter tag").isLength({ min: 1 }),
  ],
  async (req, res) => {
    try {
      const { title, description, tag } = req.body;

      // if there are error return bad statu using express validator
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const note = new Note({
        title,
        description,
        tag,
        user: req.user.id,
      });

      // saving notes in mongoose
      const savedNotes = await note.save();
      res.json(savedNotes);
    } catch (error) {
      console.log(error.message);
      res.status(500).json("some error occured");
    }
  }
);

// ROUTE 3: updating note: PUT '/api/note/updatenote/:id. login required
router.put("/updatenote/:id", fetchuser, async (req, res) => {
  const { title, description, tag } = req.body;
  try {
    // ccreating new tag
    const newNote = {};
    if (title) {
      newNote.title = title;
    }
    if (description) {
      newNote.description = description;
    }
    if (tag) {
      newNote.tag = tag;
    }

    // find note to update and update it
    let note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).send("Not found");
    }

    // allow updating if the user owns the notes
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Not allowed");
    }

    // updating
    note = await Note.findByIdAndUpdate(
      req.params.id,
      { $set: newNote },
      { new: true }
    );
    res.json({ note });
  } catch (error) {
    console.log(error.message);
    res.status(500).json("some error occured");
  }
});

// ROUTE 4: delete note: DELETE '/api/note/deletenote/:id. login required
router.delete("/deletenote/:id", fetchuser, async (req, res) => {
  try {
    // finding hte note to delete
    let note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).send("Not found");
    }

    // allow delete if the user own the note
    if (note.user.toString() !== req.user.id) {
      return res.status(404).send("Not Allowed");
    }
    // deleting
    note = await Note.findByIdAndDelete(req.params.id);
    res.json({ Success: "note has been deleted", note: note });
  } catch (error) {
    console.log(error.message);
    res.status(500).json("some error occured");
  }
});

module.exports = router;
