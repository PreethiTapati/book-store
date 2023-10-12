import express from 'express';
import dotenv from 'dotenv';

import booksRoutes from './routes/books.js';

dotenv.config(); 

const PORT = process.env.PORT || 3005;

//initialize express
const app = express();

// Body parser
app.use(express.json());

// Routes
app.use('/api/books', booksRoutes);

app.listen(PORT, () => {
    console.log(`Server is listening on port: ${PORT}`);
});
