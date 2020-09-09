/* global localStorage */

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


function newBookAction() {
const books = document.getElementsByClassName("book");
const bookArr = [...books]
bookArr.forEach((book) => {book.remove()});
newBookBtn.remove();
const form = document.createElement('form');
form.id = "form"
const authorInput = document.createElement('input');
const authorLabel = document.createElement('label');
authorLabel.innerText = "Author"
authorInput.setAttribute("type", "text");
authorInput.setAttribute("name", "author");
authorInput.setAttribute("id", "author");
const titleInput = document.createElement('input');
const titleLabel = document.createElement('label');
titleLabel.innerText = "Title"
titleLabel.setAttribute("for", "title");
titleInput.setAttribute("type", "text");
titleInput.setAttribute("name", "title");
titleInput.setAttribute("id", "title");
const pageInput = document.createElement('input');
const pageLabel = document.createElement('label');
pageLabel.innerText = "Page"
pageInput.setAttribute("type", "number");
pageInput.setAttribute("name", "page");
pageInput.setAttribute("id", "page");
const readInput = document.createElement('input');
const readLabel = document.createElement('label');
readLabel.innerText = "Read"
readInput.setAttribute("type", "checkbox");
readInput.setAttribute("name", "read");
readInput.setAttribute("id", "read");
const submitBtn = document.createElement("button")
submitBtn.setAttribute("type", "submit");
submitBtn.innerText = "Submit"
form.addEventListener("submit", function(event){
  event.preventDefault();
  submitData();
})
form.appendChild(authorLabel);
form.appendChild(authorInput);
form.appendChild(titleLabel);
form.appendChild(titleInput);
form.appendChild(pageLabel);
form.appendChild(pageInput);
form.appendChild(readLabel);
form.appendChild(readInput);
form.appendChild(submitBtn)
content.appendChild(form)
}
newBookBtn.addEventListener("click", newBookAction);
content.appendChild(newBookBtn);

function deleteBook(id) {
  myLibrary.splice(id, 1);
  localStorage.setItem('books', JSON.stringify(myLibrary));
  window.location.reload();
}


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
    
    bookDiv.appendChild(page.cloneNode(true));
    bookDiv.appendChild(title.cloneNode(true));
    bookDiv.appendChild(author.cloneNode(true));
    bookDiv.appendChild(read.cloneNode(true));
    bookDiv.appendChild(readBtnClone);
    let deleteBtn = document.createElement('button');
    deleteBtn.innerText = "Delete Book";
    deleteBtn.addEventListener("click", function() {
      deleteBook(idx)
    });
    bookDiv.appendChild(deleteBtn);

    content.appendChild(bookDiv);
  });
}


function submitData() {
  const title = document.getElementById('title').value;
  const author = document.getElementById('author').value;
  const page = document.getElementById('page').value;
  const read = document.getElementById('read').checked;
  return addBookToLibrary(title, page, author, read);
}


displayBooks(myLibrary);
content.appendChild(newBookBtn);
