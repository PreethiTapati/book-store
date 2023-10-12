import express from 'express';

import bookControllers from '../controllers/books.js'

const router = express.Router();

router.get('/', bookControllers.getBooks);
router.get('/:id', bookControllers.getBook);
router.post('/', bookControllers.postBook);
router.put('/ :id', bookControllers.putBook);

router.delete('/', bookControllers.deleteBook);



export default router;

