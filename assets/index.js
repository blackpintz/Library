//import { v4 as uuidv4 } from 'uuid';

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
  //this.id = uuidv4();
}

function addBookToLibrary(title, pages, author, read) {
  const book = new Book(title, pages, author, read);
  myLibrary.push(book);
  localStorage.setItem('books', JSON.stringify(myLibrary));
  window.location.reload();
}

function bookToggle(idx){
  myLibrary[idx].read = !myLibrary[idx].read;
  localStorage.setItem('books', JSON.stringify(myLibrary));
  window.location.reload();
}

const content = document.getElementById('content');
let bookDiv = document.createElement('div');
bookDiv.className = 'book card';
const title = document.createElement('h3');
const page = document.createElement('p');
const author = document.createElement('h4');
const read = document.createElement('p');
const newBookBtn = document.createElement('button');
let readBtn = document.createElement('button');

newBookBtn.innerText = 'Add new book';


function displayBooks(bookArr) {
  bookArr.forEach((book, idx) => {
    bookDiv = bookDiv.cloneNode(false);
    title.innerHTML = book.title;
    page.innerHTML = book.pages;
    author.innerHTML = book.author;
    read.innerHTML = book.read;
    readBtn.innerText = book.read ? 'Unread' : 'Read';
    readBtn.setAttribute('data-book-index', idx);
    let bookIdx = readBtn.getAttribute('data-book-index');
    let readBtnClone = readBtn.cloneNode(true);
    readBtnClone.onclick = function(){ return bookToggle(bookIdx); };
    
    //readBtnClone.onclick = bookToggle(bookIdx);
    bookDiv.appendChild(page.cloneNode(true));
    bookDiv.appendChild(title.cloneNode(true));
    bookDiv.appendChild(author.cloneNode(true));
    bookDiv.appendChild(read.cloneNode(true));
    bookDiv.appendChild(readBtnClone);

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
