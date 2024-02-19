const express = require("express");
const Notes = require("../models/Notes.js");
const fetchuser = require("../middleware/fetchuser");
const router = express.Router();
const { body, validationResult } = require("express-validator");
//Auth:1 fetch all notes: get "/api/notes/createuser". Doesn't require Auth
router.get("/fetchallnotes", fetchuser, async (req, res) => {
  try {
    const notes = await Notes.find({ user: req.user.id });
    res.json(notes);
  } catch (err) {
  
    console.log("error ", err);
    res.status(500).send("Internal Server ERROR:");
  }
});
// ROUTE 2: Add a new notes using: POST "/api/notes/addnotes". Login required
router.post(
  "/addnotes",
  fetchuser,
  [
    body("title", "Enter a valid title").isLength({ min: 3 }),
    body("description", "Description must be atleast 5 characters").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    try {
      const { title, description, tag } = req.body;

      // If there are errors, return Bad request and the errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const notes = new Notes({
        title,
        description,
        tag,
        user: req.user.id,
      });
      const savednotes = await notes.save();

      res.json(savednotes);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  });
  // ROUTE 3: Update an existing Note using: put "/api/notes/updatenote". Login required
router.put('/updatenote/:id', fetchuser, async (req, res) => {
  try{
  const {title, description, tag} = req.body;
  // Create a newNote object
  const newNote  = {};
  if(title){newNote.title = title};
  if(description){newNote.description = description};
  if(tag){newNote.tag = tag};

  // Find the note to be updated and update it
  let note = await Notes.findById(req.params.id);
  if(!note){return res.status(404).send("Not Found")}

  if(note.user.toString() !== req.user.id){
      return res.status(401).send("Not Allowed");
  }

  note = await Notes.findByIdAndUpdate(req.params.id, {$set: newNote}, {new:true})
  res.json({note});
  }
  catch (err) {
  
    console.log("error ", err);
    res.status(500).send("Internal Server ERROR:");
  }
  });
// ROUTE 4: Delete an existing Note using: DELETE "/api/notes/deletenote". Login required
router.delete('/deletenote/:id', fetchuser, async (req, res) => {
  try {
      // Find the note to be delete and delete it
      let note = await Notes.findById(req.params.id);
      if (!note) { return res.status(404).send("Not Found") }

      // Allow deletion only if user owns this Note
      if (note.user.toString() !== req.user.id) {
          return res.status(401).send("Not Allowed");
      }

      note = await Notes.findByIdAndDelete(req.params.id)
      res.json({ "Success": "Note has been deleted", note: note });
  } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
  }
})


module.exports = router;
