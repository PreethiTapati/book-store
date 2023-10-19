import path , {dirname} from 'path';
import { fileURLToPath } from 'url';

import express from 'express';
import dotenv from 'dotenv';

import booksRoutes from './routes/books.js';

dotenv.config(); 
const PORT = process.env.PORT || 3005;

const __filename = fileURLToPath(import.meta.url)
const PATH = dirname(__filename)

//initialize express
const app = express();

// set template engine
app.set('view engine', 'ejs');
app.set('views',path.join(PATH,'views'))

// Body parser
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//static folder
app.use(express.static(path.join(PATH, 'public')));

// Routes
app.use('/api/books', booksRoutes);

//handle 404
app.use((req, res) => {
    res.status(404).render('404', {
        title: 'Page Not Found',
        message: 'Page not found'
    });
});
// Pass the "books" data to the EJS template
app.get('/books', (req, res) => {
    res.render('book', { books: books }); 
});

//listen
app.listen(PORT, () => {
    console.log(`Server is listening on port: ${PORT}`);
});
