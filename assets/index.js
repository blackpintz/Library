const myLibrary = [
  {
    title: 'First-book',
    pages: 40,
    author: 'Rose',
    read: false,
  },
  {
    title: 'Second-book',
    pages: 60,
    author: 'Eli',
    read: false,
  },
];

function Book(title, pages, author, read) {
  this.title = title;
  this.pages = pages;
  this.author = author;
  this.read = read;
}

function addBookToLibrary(title, pages, author, read) {
  const book = new Book(title, pages, author, read);
  return myLibrary.push(book);
}

const content = document.getElementById('content');
let bookDiv = document.createElement('div');
bookDiv.className = 'book';
const title = document.createElement('h3');
const page = document.createElement('p');
const author = document.createElement('h4');
const read = document.createElement('p');
const newBookBtn = document.createElement('button');
newBookBtn.innerHTML = 'Add new book';


function displayBooks(bookArr) {
  bookArr.forEach((book) => {
    bookDiv = bookDiv.cloneNode(false);
    title.innerHTML = book.title;
    page.innerHTML = book.pages;
    author.innerHTML = book.author;
    read.innerHTML = book.read;

    bookDiv.appendChild(page.cloneNode(true));
    bookDiv.appendChild(title.cloneNode(true));
    bookDiv.appendChild(author.cloneNode(true));
    bookDiv.appendChild(read.cloneNode(true));

    content.appendChild(bookDiv);
  });
}

function submitData(event) {
  event.preventDefault();
  const title = document.getElementById('title').value;
  const author = document.getElementById('author').value;
  const page = document.getElementById('page').value;
  const read = document.getElementById('read').checked;
  return addBookToLibrary(title, page, author, read);
}

const form = document.getElementById('form');

form.onsubmit = submitData;

displayBooks(myLibrary);
