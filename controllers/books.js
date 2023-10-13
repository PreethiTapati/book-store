import { v4 } from 'uuid';

let books = [
    {
        id: '1',
        title: 'HarryPotter',
        coverImage: 'https://d5i0fhmkm8zzl.cloudfront.net/book/9788176558808.jpg',
        author: 'J.K.Rowling',
        price: 19.99
        
    },
    {
        id: '2',
        title: 'SherlockHolmes',
        coverImage: 'https://m.media-amazon.com/images/I/91hJe52QzjL._SY522_.jpg',
        author: 'Arthur Conan Doyle',
        price: 14.99,
        
    },
    {
        id: '3',
        title: 'Atomic Habits',
        coverImage: 'https://m.media-amazon.com/images/I/91iJduVHk2L._SY522_.jpg',
        author: 'James Clear',
        price: 10.99,
        
    },
    {
        id: '4',
        title: 'Eat Pray Love',
        coverImage: 'https://images-eu.ssl-images-amazon.com/images/I/81EvR6P5-GL._AC_UL600_SR450,600_.jpg',
        author: 'Elizabeth Gilbert',
        price: 14.99,
        
    },
      {
        id: '5',
        title: 'all that she can see',
        coverImage: 'https://m.media-amazon.com/images/I/71+dsHCD7tL._SY522_.jpg',
        author: 'Carrie Hope Fletcher',
        price: 14.99,
        
    },
];
function getBookById(id) {
    return books.find(book => book.id === id);
} 
const booksControllers = {
    getBooks: (req, res) => {
        res.status(200).render('books', { books: books });
    },
 getBook: (req, res) => {
    const { id } = req.params; // Capture the book's ID from the URL
    const book = getBookById(id); // Retrieve the book using your function (e.g., getBookById)

    if (book) {
        res.render('book', { book: book });
    } else {
        // Handle the case where the book with the given ID is not found
        res.status(404).render('404', {
            message: `Book with ID ${id} not found`,
            title: '📚 Book Library'
        });
    }
},

    postBook: (req, res) => {
        const { title, author, price, coverImage, } = req.body;
        const newBook = {
            id: v4(),
            title: title,
            author: author,
            price: price,
            coverImage: coverImage,

        };
        books.push(newBook);
        res.status(201).redirect('/api/books'); // Redirect to the books list
    },
    putBook: (req, res) => {
        const { id } = req.params;
        const { title, author, price, coverImage, } = req.body;

        const bookExist = getBookById(id);

        if (bookExist) {
            const updatedBook = {
                id,
                title,
                author,
                price,
                coverImage,
            };
            const bookToUpdate = books.find((book) => book.id === id);

            if (bookToUpdate) {
                bookToUpdate.id = updatedBook.id;
                bookToUpdate.title = updatedBook.title;
                bookToUpdate.author = updatedBook.author;
                bookToUpdate.price = updatedBook.price;
                bookToUpdate.coverImage = updatedBook.coverImage;
                res.status(200).redirect('/api/books'); // Redirect to the books list
            } else {
                res.status(500).render('error', {
                    message: `Failed to update book with id: ${id}`,
                    title: '📚 Book Library',
                });
            }
        } else {
            res.status(404).render('404', {
                message: `Book with id ${id} does not exist`,
                title: '📚 Book Library',
            });
        }
    },
    deleteBook: (req, res) => {
        const { id } = req.params;
        const bookExist = getBookById(id);

        if (bookExist) {
            books = books.filter((book) => book.id !== id);
            res.status(200).redirect('/api/books'); // Redirect to the books list
        } else {
            res.status(404).render('404', {
                message: `Book with id ${id} does not exist`,
                title: '📚 Book Library',
            });
        }
    },
};

export default booksControllers;
