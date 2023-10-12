

let books = [
    {
        id: '1',
        name: 'HarryPotter',
        author: 'J.K.Rowling'
    },
    {
        id: '2',
        name: 'SherlockHolmes',
        author: 'Arthur Conan Doyle'
    },
    {
        id: '3',
        name: 'Atomic Habits',
        author: 'James Clear'
    },
    {
        id: '4',
        name: 'The Canterville Ghost',
        author: 'Oscar Wilde'
    }
];


const bookControllers = {
    getBooks: (req, res) => {
        res.status(200).json(books);
    },
    getBook: (req, res) => {
        const { id } = req.params;
        const bookExist = getBooksById(id);

        if (bookExist) {
            res.status(200).json(bookExist);
        } else {
            res.status(404).json({
                message: `Book with id ${id} does not exist`
            });
        }
    },
    postBook: (req, res) => {
        const { name, author } = req.body;
        const newBook = {
            id: String(books.length + 1),
            name: name,
            author: author
        };
        books.push(newBook);
        res.status(201).json(newBook);
    },
    putBook: (req, res) => {
        const { id } = req.params;
        const bookExist = getBooksById(id);

        if (bookExist) {
            const updatedBook = req.body;
            books = books.map((book) => {
                if (book.id === id) {
                    return { ...book, ...updatedBook };
                }
                return book;
            });
            res.status(200).json({
                message: `Book with id: ${id} updated`,
                book: getBooksById(id)
            });
        } else {
            res.status(404).json({
                message: `Book with id ${id} does not exist`
            });
        }
    },
    deleteBook: (req, res) => {
        const { id } = req.params;
        const bookExist = getBooksById(id);

        if (bookExist) {
            books = books.filter((book) => book.id !== id);
            res.status(200).json({
                message: `Book with id: ${id} deleted`
            });
        } else {
            res.status(404).json({
                message: `Book with id ${id} does not exist`
            });
        }
    }
};

export default bookControllers;
