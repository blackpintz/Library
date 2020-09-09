const myLibrary = localStorage.getItem('books')
  ? JSON.parse(localStorage.getItem('books'))
  : [];

localStorage.setItem('books', JSON.stringify(myLibrary));
JSON.parse(localStorage.getItem('books'));

function Book(title, pages, author, read) {
  this.title = title;
  this.pages = pages;
  this.author = author;
  this.read = read;
}

function addBookToLibrary(title, pages, author, read) {
  const book = new Book(title, pages, author, read);
  myLibrary.push(book);
  localStorage.setItem('books', JSON.stringify(myLibrary));
  window.location.reload();
}

function bookToggle(idx) {
  myLibrary[idx].read = !myLibrary[idx].read;
  localStorage.setItem('books', JSON.stringify(myLibrary));
  window.location.reload();
}

const content = document.getElementById('content');
let bookDiv = document.createElement('div');
bookDiv.className = 'book card card-body';
const title = document.createElement('h3');
title.className = 'card-title';
const page = document.createElement('p');
page.className = 'card-text';
const author = document.createElement('h4');
const read = document.createElement('p');
const newBookBtn = document.createElement('button');
newBookBtn.className = 'btn btn-success float-right';
const readBtn = document.createElement('button');
readBtn.className = 'btn btn-info btn-sm';

newBookBtn.innerText = 'Add new book';

function submitData() {
  const title = document.getElementById('title').value;
  const author = document.getElementById('author').value;
  const page = document.getElementById('page').value;
  const read = document.getElementById('read').checked;
  return addBookToLibrary(title, page, author, read);
}

function newBookAction() {
  const books = document.getElementsByClassName('book');
  const bookArr = [...books];
  bookArr.forEach((book) => { book.remove(); });
  newBookBtn.remove();
  const form = document.createElement('form');
  form.id = 'form';
  const authorInput = document.createElement('input');
  const authorLabel = document.createElement('label');
  authorLabel.innerText = 'Author';
  authorInput.setAttribute('type', 'text');
  authorInput.setAttribute('name', 'author');
  authorInput.setAttribute('id', 'author');
  const titleInput = document.createElement('input');
  const titleLabel = document.createElement('label');
  titleLabel.innerText = 'Title';
  titleLabel.setAttribute('for', 'title');
  titleInput.setAttribute('type', 'text');
  titleInput.setAttribute('name', 'title');
  titleInput.setAttribute('id', 'title');
  const pageInput = document.createElement('input');
  const pageLabel = document.createElement('label');
  pageLabel.innerText = 'Page';
  pageInput.setAttribute('type', 'number');
  pageInput.setAttribute('name', 'page');
  pageInput.setAttribute('id', 'page');
  const readInput = document.createElement('input');
  const readLabel = document.createElement('label');
  readLabel.innerText = 'Read';
  readInput.setAttribute('type', 'checkbox');
  readInput.setAttribute('name', 'read');
  readInput.setAttribute('id', 'read');
  const submitBtn = document.createElement('button');
  submitBtn.setAttribute('type', 'submit');
  submitBtn.innerText = 'Submit';
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    submitData();
  });
  form.appendChild(authorLabel);
  form.appendChild(authorInput);
  form.appendChild(titleLabel);
  form.appendChild(titleInput);
  form.appendChild(pageLabel);
  form.appendChild(pageInput);
  form.appendChild(readLabel);
  form.appendChild(readInput);
  form.appendChild(submitBtn);
  content.appendChild(form);
}
newBookBtn.addEventListener('click', newBookAction);

function deleteBook(id) {
  myLibrary.splice(id, 1);
  localStorage.setItem('books', JSON.stringify(myLibrary));
  window.location.reload();
}


function displayBooks(bookArr) {
  bookArr.forEach((book, idx) => {
    bookDiv = bookDiv.cloneNode(false);
    title.innerHTML = book.title;
    page.innerHTML = 'Pages: ' + book.pages;
    author.innerHTML = 'Author: ' + book.author;
    read.innerHTML = 'Status: ' + (book.read ? 'Read': 'Not Read');
    readBtn.innerText = book.read ? 'Unread' : 'Read';
    readBtn.setAttribute('data-book-index', idx);
    const bookIdx = readBtn.getAttribute('data-book-index');
    const readBtnClone = readBtn.cloneNode(true);
    readBtnClone.onclick = () => bookToggle(bookIdx);

    bookDiv.appendChild(title.cloneNode(true));
    bookDiv.appendChild(page.cloneNode(true));
    bookDiv.appendChild(author.cloneNode(true));
    bookDiv.appendChild(read.cloneNode(true));
    bookDiv.appendChild(readBtnClone);
    const deleteBtn = document.createElement('button');
    deleteBtn.innerText = 'Delete Book';
    deleteBtn.addEventListener('click', () => {
      deleteBook(idx);
    });
    bookDiv.appendChild(deleteBtn);

    content.appendChild(bookDiv);
  });
}


displayBooks(myLibrary);
document.getElementById('nav-id').appendChild(newBookBtn);
