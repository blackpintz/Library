const myLibrary = [{
  title: 'First-book',
  pages: 10,
  author: 'Rose',
  read: false,
}, {
  title: 'Second-book',
  pages: 10,
  author: 'Eli',
  read: false,
}];

const content = document.getElementById('content');
const bookDiv = document.createElement('div');
const title = document.createElement('h3');
const page = document.createElement('p');
const author = document.createElement('h4');
const read = document.createElement('p');

bookDiv.innerHTML = 'Div book.';
content.appendChild(bookDiv);

function Book(title, pages, author, read) {
  this.title = title;
  this.pages = pages;
  this.author = author;
  this.read = false;
}

function addBookToLibrary(title, pages, author, read) {
  const book = new Book(title, pages, author, read);
  return myLibrary.push(book);
}

function displayBooks(bookArr) {
  bookArr.forEach((book) => {
    title.innerHTML = book.title;
    page.innerHTML = book.pages;
  });
}
