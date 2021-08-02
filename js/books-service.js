'use strict'
const KEY = 'booksDB';
const PAGE_SIZE = 5;
var gPageIdx = 0;
var gNextId;

var gBooks;
var gSortBy = 'id';

_createBooks();

function sortBy() {
    gBooks.sort(function (a, b) {
        switch (gSortBy) {
            case 'id':
                return a.id - b.id;
            case 'title':
                if (a.name.charAt(0).toLowerCase() > b.name.charAt(0).toLowerCase()) return 1;
                else return -1;
            case 'price':
                return a.price - b.price;
        }
    })
    _saveBooksToStorage();
}

function setSortgBy(sortBy) {
    gSortBy = sortBy;
}

function backPage() {
    if (gPageIdx <= 0) return;
    gPageIdx--;
    console.log(gPageIdx);
}

function nextPage() {
    if ((gPageIdx+1) * PAGE_SIZE > gBooks.length) return;
    gPageIdx++;
    console.log('hi', gPageIdx);
}

// function getPagesCount() {
//     var count = gBooks.length / PAGE_SIZE;
//     return (count % 10) ? parseInt(count) + 1 : count;
// }

function getBooks() {
    var startIdx = (gPageIdx * PAGE_SIZE);
    return gBooks.slice(startIdx, startIdx + PAGE_SIZE)
}


function deleteBook(bookId) {
    var bookIdx = gBooks.findIndex(function (book) {
        return bookId === book.id
    })
    gBooks.splice(bookIdx, 1)
    _saveBooksToStorage();
}

function addBook(name, price) {
    var book = _createBook(name, price)
    gBooks.unshift(book)
    _saveBooksToStorage();
}

function getBookById(bookId) {
    return gBooks.find(function (book) { return book.id === bookId });
}

function updateBook(bookId, newPrice) {
    var book = getBookById(bookId);
    book.price = newPrice;
    _saveBooksToStorage();
}

function rateBook(name, rate) {
    var book = gBooks.find(function (book) {
        return book.name === name;
    })
    book.rate = rate;
    _saveBooksToStorage();
}

function _createBook(name, price) {
    gNextId = loadFromStorage('gNextId');
    var book = {
        id: gNextId++,
        name,
        price,
        desc: makeLorem(),
        rate: 0
    }
    _saveNextIdToStorage();
    return book;
}

function _saveNextIdToStorage() {
    saveToStorage('gNextId', gNextId);
}

function _createBooks() {
    var books = loadFromStorage(KEY)
    if (!books || !books.length) {
        gNextId = 1;
        _saveNextIdToStorage();
        books = [
            _createBook('Harry Potter and the Half Blood Prince', 23.9),
            _createBook('Games Of Thrones', 29.9)
        ]
    }
    gBooks = books;
    _saveBooksToStorage();
}

function _saveBooksToStorage() {
    saveToStorage(KEY, gBooks);
}

