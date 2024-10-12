const express = require("express")
const NoteModel = require("../models/NotesModel")
const Note = require('../models/NotesModel');

const routes = express.Router()

//Retrieve All Notes
routes.get("/notes", (req, res) => {
    // Get all notes from MongoDB
    NoteModel.find().then((notes) => {
        res.send(notes)
    }).catch((error) => {
        res.status(500).send({message: error.message})
    })
})

//Add NEW Note
routes.post("/notes", async (req, res) => {
    const noteData = req.body
    try {
        // Create a new note instance
        const note = new NoteModel(noteData)
        // Save the new note to MongoDB
        const newNote = await note.save()
        res.send(newNote)
    } catch (error) {
        res.status(500).send({message: error.message})
    }
})

//Update existing Note By Id
routes.put("/notes/:noteid", (req, res) => {
    // Update note by ID
    NoteModel.findByIdAndUpdate(req.params.noteid, req.body, {new: true})
    .then((note) => {
        if(note) {
            res.send(note)
        } else {
            res.status(404).send({message: "Note not found"})
        }
    }).catch((error) => {
        res.status(500).send({message: error.message})
    })
})

//Delete Note By ID
routes.delete("/notes/:noteid", (req, res) => {
    NoteModel.findByIdAndDelete(req.params.noteid)
    .then((note) => {
        if(note) {
            res.send(note)
        } else {
            res.status(404).send({message: "Note not found"})
        }
    }).catch((error) => {
        res.status(500).send({message: error.message})
    })
})

//Retrieve a single Note By ID
routes.get("/notes/:noteid", (req, res) => {
    NoteModel.findById(req.params.noteid).then((note) => {
        if(note) {
            res.send(note)
        } else {
            res.status(404).send({message: "Note not found"})
        }
    }).catch((error) => {
        res.status(500).send({message: error.message})  
    })
})

module.exports = routes