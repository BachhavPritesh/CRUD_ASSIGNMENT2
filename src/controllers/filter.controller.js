const mongoose = require('mongoose');
const Note = require('../models/note.model');
const { successResponse, errorResponse } = require('../utils/responseHelper');

const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

const getNotesByCategory = async (req, res) => {
    try {
        const { category } = req.params;
        const validCategories = ["work", "personal", "study"];

        if (!validCategories.includes(category)) {
            return errorResponse(res, "Invalid category. Allowed: work, personal, study", 400);
        }

        const notes = await Note.find({ category });

        if (notes.length === 0) {
            return errorResponse(res, `No notes found for category: ${category}`, 404);
        }

        return successResponse(res, `Notes fetched for category: ${category}`, notes, 200, { count: notes.length });
    } catch (error) {
        return errorResponse(res, error.message, 500);
    }
};

const getNotesByStatus = async (req, res) => {
    try {
        const { isPinned } = req.params;

        if (isPinned !== "true" && isPinned !== "false") {
            return errorResponse(res, "isPinned must be true or false", 400);
        }

        const pinned = isPinned === "true";
        const notes = await Note.find({ isPinned: pinned });

        return successResponse(res, "Fetched all pinned notes", notes, 200, { count: notes.length });
    } catch (error) {
        return errorResponse(res, error.message, 500);
    }
};

const getNoteSummary = async (req, res) => {
    try {
        const { id } = req.params;

        if (!isValidObjectId(id)) {
            return errorResponse(res, "Invalid note ID", 400);
        }

        const note = await Note.findById(id).select("title category isPinned createdAt");

        if (!note) {
            return errorResponse(res, "Note not found", 404);
        }

        return successResponse(res, "Note summary fetched successfully", note);
    } catch (error) {
        return errorResponse(res, error.message, 500);
    }
};

const filterNotes = async (req, res) => {
    try {
        const filter = {};

        if (req.query.category) {
            filter.category = req.query.category;
        }
        if (req.query.isPinned !== undefined) {
            filter.isPinned = req.query.isPinned === "true";
        }

        const notes = await Note.find(filter);
        return successResponse(res, "Notes fetched successfully", notes, 200, { count: notes.length });
    } catch (error) {
        return errorResponse(res, error.message, 500);
    }
};

const getPinnedNotes = async (req, res) => {
    try {
        const filter = { isPinned: true };

        if (req.query.category) {
            filter.category = req.query.category;
        }

        const notes = await Note.find(filter);
        return successResponse(res, "Pinned notes fetched successfully", notes, 200, { count: notes.length });
    } catch (error) {
        return errorResponse(res, error.message, 500);
    }
};

const filterByCategory = async (req, res) => {
    try {
        const { name } = req.query;

        if (!name) {
            return errorResponse(res, "Query param 'name' is required", 400);
        }

        const notes = await Note.find({ category: name });

        if (notes.length === 0) {
            return errorResponse(res, `No notes found for category: ${name}`, 404);
        }

        return successResponse(res, `Notes filtered by category: ${name}`, notes, 200, { count: notes.length });
    } catch (error) {
        return errorResponse(res, error.message, 500);
    }
};

const filterByDateRange = async (req, res) => {
    try {
        const { from, to } = req.query;

        if (!from || !to) {
            return errorResponse(res, "Both 'from' and 'to' query params are required", 400);
        }

        const filter = {
            createdAt: {
                $gte: new Date(from),
                $lte: new Date(to),
            },
        };

        const notes = await Note.find(filter);
        return successResponse(res, `Notes fetched between ${from} and ${to}`, notes, 200, { count: notes.length });
    } catch (error) {
        return errorResponse(res, error.message, 500);
    }
};

module.exports = {
    getNotesByCategory,
    getNotesByStatus,
    getNoteSummary,
    filterNotes,
    getPinnedNotes,
    filterByCategory,
    filterByDateRange,
};