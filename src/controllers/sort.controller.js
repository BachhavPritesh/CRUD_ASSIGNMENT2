const Note = require('../models/note.model');
const { successResponse, errorResponse } = require('../utils/responseHelper');

const sortNotes = async (req, res) => {
    try {
        const allowed = ["title", "createdAt", "updatedAt", "category"];
        const sortBy = req.query.sortBy || "createdAt";
        const order = req.query.order === "asc" ? 1 : -1;

        if (!allowed.includes(sortBy)) {
            return errorResponse(res, "Invalid sortBy. Allowed: title, createdAt, updatedAt, category", 400);
        }

        const notes = await Note.find().sort({ [sortBy]: order });
        const orderLabel = req.query.order === "asc" ? "ascending" : "descending";
        return successResponse(res, `Notes sorted by ${sortBy} in ${orderLabel} order`, notes, 200, { count: notes.length });
    } catch (error) {
        return errorResponse(res, error.message, 500);
    }
};

const sortPinnedNotes = async (req, res) => {
    try {
        const allowed = ["title", "createdAt", "updatedAt", "category"];
        const sortBy = req.query.sortBy || "createdAt";
        const order = req.query.order === "asc" ? 1 : -1;

        if (!allowed.includes(sortBy)) {
            return errorResponse(res, "Invalid sortBy. Allowed: title, createdAt, updatedAt, category", 400);
        }

        const notes = await Note.find({ isPinned: true }).sort({ [sortBy]: order });
        const orderLabel = req.query.order === "asc" ? "ascending" : "descending";
        return successResponse(res, `Pinned notes sorted by ${sortBy} in ${orderLabel} order`, notes, 200, { count: notes.length });
    } catch (error) {
        return errorResponse(res, error.message, 500);
    }
};

module.exports = {
    sortNotes,
    sortPinnedNotes,
};