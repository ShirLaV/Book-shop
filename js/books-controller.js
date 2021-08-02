'use strict'

var gRate;

function onInit() {
    renderBooks();
    // renderPages();
}

function renderBooks() {
    sortBy();
    var books = getBooks();
    var strHtmls = books.map(function (book) {
        return `<tr>
        <td>${book.id}</td>
        <td>${book.name}</td>
        <td>${book.price} $</td>
        <td>${book.rate}</td>
        <td>
        <button class="read-btn" onclick="onReadbook(${book.id})">Read</button>
        <button class="upd-btn" onclick="onUpdateBook(${book.id})">Update</button>
        <button class="dlt-btn" onclick="onDeleteBook(${book.id})">Delete</button>
        </td></tr>`
    })
    document.querySelector('.books').innerHTML = strHtmls.join('');
}

// function renderPages() {
//     var strHtmls;
//     var pageCount = getPagesCount();
//     for (var i=0; i<pageCount; i++){
//         strHtmls+=`<input type="radio" name="page-button" value="${i+1}">`
//     }
//     document.querySelector('.pages-numbers').innerHTML=strHtmls;
// }

function onPageChange(isPageBack) {
    if (isPageBack) backPage();
    else nextPage();
    renderBooks();
}

function onSortTableBy(sortBy) {
    setSortgBy(sortBy);
    renderBooks();
}

function onDeleteBook(bookId) {
    deleteBook(bookId);
    renderBooks();
}

function onAddBook() {
    var name = document.querySelector('[name=book-name').value;
    var price = document.querySelector('[name=book-price').value;
    if (!name || !price) return;
    addBook(name, price);
    renderBooks();
    document.querySelector('[name=book-name').value = '';
    document.querySelector('[name=book-price').value = '';
}

function onUpdateBook(bookId) {
    var newPrice = +prompt('new price?');
    updateBook(bookId, newPrice);
    renderBooks();
}

function onReadbook(bookId) {
    var book = getBookById(bookId)
    var elModal = document.querySelector('.modal')
    elModal.querySelector('h5').innerText = book.name
    elModal.querySelector('h6').innerText = book.price + ' $'
    elModal.querySelector('p').innerText = book.desc
    elModal.hidden = false;
    gRate = 0;
    updateModal();
}

function onUpdateRate(isToLower) {
    if (isToLower && gRate > 0) --gRate;
    else if (!isToLower && gRate < 10) ++gRate;
    updateModal();
}

function updateModal() {
    var elModalSpan = document.querySelector('.modal span');
    elModalSpan.innerText = gRate;
}

function onRateBook() {
    var elModalH5 = document.querySelector('.modal h5');
    console.log(elModalH5)
    var bookName = elModalH5.innerText;
    rateBook(bookName, gRate);
    gRate = 0;
    updateModal();
    renderBooks();
}

function onCloseModal() {
    document.querySelector('.modal').hidden = true;
}

function onNextPage() {
    nextPage();
    renderBooks();
}