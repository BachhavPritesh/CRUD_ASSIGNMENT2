const mongoose = require('mongoose');
const Note = require('../models/note.model');
const { successResponse, errorResponse } = require('../utils/responseHelper');

const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

const createNote = async (req, res) => {
    try {
        const { title, content } = req.body;

        if (!title || !content) {
            return errorResponse(res, "Title and content are required", 400);
        }

        const note = await Note.create({ title, content });
        return successResponse(res, "Note created successfully", note, 201);
    } catch (error) {
        return errorResponse(res, error.message, 500);
    }
};

const createBulkNotes = async (req, res) => {
    try {
        const { notes } = req.body;

        if (!notes || !Array.isArray(notes) || notes.length === 0) {
            return errorResponse(res, "notes array is required and cannot be empty", 400);
        }

        const createdNotes = await Note.insertMany(notes);
        return successResponse(res, `${createdNotes.length} notes created successfully`, createdNotes, 201);
    } catch (error) {
        return errorResponse(res, error.message, 500);
    }
};

const getAllNotes = async (req, res) => {
    try {
        const notes = await Note.find();
        return successResponse(res, "Notes fetched successfully", notes, 200, { count: notes.length });
    } catch (error) {
        return errorResponse(res, error.message, 500);
    }
};

const getNoteById = async (req, res) => {
    try {
        const { id } = req.params;

        if (!isValidObjectId(id)) {
            return errorResponse(res, "Invalid note ID", 400);
        }

        const note = await Note.findById(id);

        if (!note) {
            return errorResponse(res, "Note not found", 404);
        }

        return successResponse(res, "Note fetched successfully", note);
    } catch (error) {
        return errorResponse(res, error.message, 500);
    }
};

const replaceNote = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, content, category, isPinned } = req.body;

        if (!isValidObjectId(id)) {
            return errorResponse(res, "Invalid note ID", 400);
        }

        const note = await Note.findByIdAndReplace(
            id,
            { title, content, category, isPinned },
            { new: true, overwrite: true, runValidators: true }
        );

        if (!note) {
            return errorResponse(res, "Note not found", 404);
        }

        return successResponse(res, "Note replaced successfully", note);
    } catch (error) {
        return errorResponse(res, error.message, 500);
    }
};

const updateNote = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;

        if (!isValidObjectId(id)) {
            return errorResponse(res, "Invalid note ID", 400);
        }

        if (!updates || Object.keys(updates).length === 0) {
            return errorResponse(res, "No fields provided to update", 400);
        }

        const note = await Note.findByIdAndUpdate(id, updates, { new: true, runValidators: true });

        if (!note) {
            return errorResponse(res, "Note not found", 404);
        }

        return successResponse(res, "Note updated successfully", note);
    } catch (error) {
        return errorResponse(res, error.message, 500);
    }
};

const deleteNote = async (req, res) => {
    try {
        const { id } = req.params;

        if (!isValidObjectId(id)) {
            return errorResponse(res, "Invalid note ID", 400);
        }

        const note = await Note.findByIdAndDelete(id);

        if (!note) {
            return errorResponse(res, "Note not found", 404);
        }

        return successResponse(res, "Note deleted successfully", null);
    } catch (error) {
        return errorResponse(res, error.message, 500);
    }
};

const deleteBulkNotes = async (req, res) => {
    try {
        const { ids } = req.body;

        if (!ids || !Array.isArray(ids) || ids.length === 0) {
            return errorResponse(res, "ids array is required and cannot be empty", 400);
        }

        const result = await Note.deleteMany({ _id: { $in: ids } });
        return successResponse(res, `${result.deletedCount} notes deleted successfully`, null);
    } catch (error) {
        return errorResponse(res, error.message, 500);
    }
};

module.exports = {
    createNote,
    createBulkNotes,
    getAllNotes,
    getNoteById,
    replaceNote,
    updateNote,
    deleteNote,
    deleteBulkNotes,
};