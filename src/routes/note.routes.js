const express = require('express');
const router = express.Router();

const crudController = require('../controllers/crud.controller');
const filterController = require('../controllers/filter.controller');
const paginationController = require('../controllers/pagination.controller');
const sortController = require('../controllers/sort.controller');

router.post('/bulk', crudController.createBulkNotes);
router.delete('/bulk', crudController.deleteBulkNotes);

router.get('/category/:category', filterController.getNotesByCategory);
router.get('/status/:isPinned', filterController.getNotesByStatus);

router.get('/filter', filterController.filterNotes);
router.get('/filter/pinned', filterController.getPinnedNotes);
router.get('/filter/category', filterController.filterByCategory);
router.get('/filter/date-range', filterController.filterByDateRange);

router.get('/paginate', paginationController.paginateNotes);
router.get('/paginate/category/:category', paginationController.paginateByCategory);

router.get('/sort', sortController.sortNotes);
router.get('/sort/pinned', sortController.sortPinnedNotes);

router.post('/', crudController.createNote);
router.get('/', crudController.getAllNotes);
router.get('/:id/summary', filterController.getNoteSummary);
router.get('/:id', crudController.getNoteById);
router.put('/:id', crudController.replaceNote);
router.patch('/:id', crudController.updateNote);
router.delete('/:id', crudController.deleteNote);

module.exports = router;