'use strict';

$(document).ready(function () {
    createBooks();
    renderBooks();
    $('.submit-book').click(onAddBook);
    $('.new-book-form').hide();
})

function renderBooks() {
    var books = gBooks;
    var strHTML = '';
    strHTML = books.map(function (book) {
        return `
        <tr>
            <td>${book.id + 1}</td>
            <td>${book.title}</td>
            <td>${parseFloat(book.price).toFixed(2)}$</td>
            <td><button class="btn btn-outline-info read" data-id="${book.id}">Read</button></td>
            <td><button class="btn btn-outline-warning update" data-id="${book.id}">Update</button></td>
            <td><button class="btn btn-outline-danger delete" data-id="${book.id}">Delete</button></td>
        </tr>`
    })
    strHTML = strHTML.join('') + '</tbody>';
    $('.books-display').html(strHTML);
    addEventListeners();
}

function addEventListeners() {
    $('.read').click(onGetBookReadDisplay);
    $('.update').click(onUpdateBookDetails);
    $('.delete').click(onDeleteBook);
    $('.add-book').click(onShowAddBook);

}

function onGetBookReadDisplay() {
    var el = $(this);
    var bookToDisplayId = findBookId(el);
    var bookToDisplay = gBooks.find(function (book) { return book.id === bookToDisplayId });
    var strHTML = `
        <div class="items-container">
        <img src=${bookToDisplay.imgUrl}>
        <table class="table table-bordered" style="position: relative">
                <thead class="thead-light">
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Title</th>
                        <th scope="col">Price</th>
                        <th scope="col">Rating</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>${bookToDisplay.id + 1}</td>
                        <td>${bookToDisplay.title}</td>
                        <td>${bookToDisplay.price}</td>
                        <td>
                            <button onclick="onUpdateRating('lower', this)" data-id="${bookToDisplay.id}">-</button>
                            <span class="rating-display">${bookToDisplay.rating}</span>
                            <button onclick="onUpdateRating('higher', this)" data-id="${bookToDisplay.id}">+</button>
                        </td>
                    </tr>
                </tbody>
                
        </div>
        <button onclick="renderBackGallery()">Click Me To Get Back To Gallery</button>`;
    $('.display').html(strHTML);
}

function renderBackGallery() {
    var strHTML = `<table class="table table-bordered" style="position: relative">
                <thead class="thead-dark">
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Title</th>
                        <th scope="col">Price</th>
                        <th scope="col" colspan="3"><span>Actions</span>
                            <button class="btn btn-outline-success add-book">+Add Book</button></th>
                    </tr>
                </thead>
                <tbody class="books-display">

                </tbody>
            </table>`;
    $('.display').html(strHTML);
    renderBooks();
}

function onUpdateRating(addOrSubtract, elBtn) {
    var book = gBooks[$(elBtn).attr('data-id')];
    updateRating(book, addOrSubtract);
    renderRating(book);
    saveToStorage('gBooks', gBooks);
}

function renderRating(book) {
    $('.rating-display').text(book.rating);
}

function onUpdateBookDetails() {
    var newPrice = +prompt('New price of book?');
    if (newPrice <= 0) return;
    var el = $(this);
    var bookToUpdateId = findBookId(el);
    updateBookDetails(bookToUpdateId, newPrice);
    saveToStorage('gBooks', gBooks);
    saveToStorage('gIdx', gIdx);
    renderBooks();
}

function onDeleteBook() {
    var el = $(this);
    var ans = confirm('Are you sure you want to delete this book?');
    if (ans) {
        var bookToDeleteId = findBookId(el);
        deleteBook(bookToDeleteId);
    }
    saveToStorage('gBooks', gBooks);
    saveToStorage('gIdx', gIdx);
    renderBooks();
}

function onAddBook(event) {
    // event.stopPropagation()
    console.log('got here', event)
    var booktitle = $('#bookTitle').val();
    var bookprice = +$('#bookPrice').val();
    var bookImgUrl = "imgs/" + $('#bookImage').val().substring(12);
    // debugger;
    addBook(booktitle, bookprice, bookImgUrl);
    saveToStorage('gBooks', gBooks);
    saveToStorage('gIdx', gIdx);
    $('.new-book-form').hide();
    renderBooks();
}

function findBookId(el) {
    return +el.attr('data-id');
}

function onShowAddBook() {
    $('.new-book-form').toggle();
}