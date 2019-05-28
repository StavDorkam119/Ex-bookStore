'use strict';
var gBooks;
var gIdx;

function createBooks(){
    var books = loadFromStorage('gBooks');
    var idx = loadFromStorage('gIdx');
    if (!books || !books.length){
        idx = 0;
        books = [
            createBook('A Game of Thrones', 4.99, 'imgs/game_of_thrones_book_1.jpg'),
            createBook('A Clash of Kings', 5.99, 'imgs/game_of_thrones_book_2.jpg'),
            createBook('A Storm of Swords', 6.99, 'imgs/game_of_thrones_book_3.jpg'),
            createBook('A Feast for Crows', 7.99, 'imgs/game_of_thrones_book_4.jpg'),
            createBook('A Dance of Dragons', 5.45, 'imgs/game_of_thrones_book_5.jpg'),
        ];
        books.forEach(function(book){
            book.id = idx++;
        })
    }
    gBooks = books;
    gIdx = idx;
    saveToStorage('gBooks', gBooks);
    saveToStorage('gIdx', gIdx);
}

function createBook(title, price, img){
    return {
        id: gIdx++,
        title: title,
        price: +price,
        imgUrl: img,
        rating: 5,
    }
}

function deleteBook(bookToDeleteId) {
    // debugger;
    var bookToDeleteIdx = gBooks.findIndex(function(book){return book.id === bookToDeleteId});
    gBooks.splice(bookToDeleteIdx, 1);
}

function addBook(bookTitle, bookPrice, bookImgUrl){
    console.log('adding book')
    gBooks.push(createBook(bookTitle, bookPrice, bookImgUrl));
}

function updateBookDetails(bookId, newPrice) {
    var book = gBooks.find(function(book) {return book.id === bookId});
    book.price = newPrice;
}

function updateRating(book, addOrSubtract) {
    if (addOrSubtract === 'higher') {
        if (book.rating === 10) return;
        else book.rating++;
    } else if (addOrSubtract === 'lower') {
        if (book.rating === 1) return;
        else book.rating--;
    }
}