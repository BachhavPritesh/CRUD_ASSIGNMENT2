const Note = require('../models/note.model');
const { successResponse, errorResponse } = require('../utils/responseHelper');

const paginateNotes = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        const total = await Note.countDocuments();
        const totalPages = Math.ceil(total / limit);
        const notes = await Note.find().skip(skip).limit(limit);

        return successResponse(res, "Notes fetched successfully", notes, 200, {
            pagination: {
                total,
                page,
                limit,
                totalPages,
                hasNextPage: page < totalPages,
                hasPrevPage: page > 1,
            },
        });
    } catch (error) {
        return errorResponse(res, error.message, 500);
    }
};

const paginateByCategory = async (req, res) => {
    try {
        const { category } = req.params;
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        const filter = { category };
        const total = await Note.countDocuments(filter);
        const totalPages = Math.ceil(total / limit);
        const notes = await Note.find(filter).skip(skip).limit(limit);

        return successResponse(res, `Notes fetched for category: ${category}`, notes, 200, {
            pagination: {
                total,
                page,
                limit,
                totalPages,
                hasNextPage: page < totalPages,
                hasPrevPage: page > 1,
            },
        });
    } catch (error) {
        return errorResponse(res, error.message, 500);
    }
};

module.exports = {
    paginateNotes,
    paginateByCategory,
};