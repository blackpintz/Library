/* eslint-disable-next-line import/extensions */
import * as storageModules from './storage.js';

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

const submitData = () => {
  const title = document.getElementById('title').value;
  const author = document.getElementById('author').value;
  const page = document.getElementById('page').value;
  const read = document.getElementById('read').checked;
  return storageModules.addBookToLibrary(title, page, author, read);
};

const newBookAction = () => {
  const container = document.getElementById('page-container');
  content.remove();
  const form = document.createElement('form');
  form.id = 'form';
  form.className = 'libraryForm d-flex flex-column mx-auto';
  const authorInput = document.createElement('input');
  const authorLabel = document.createElement('label');
  authorLabel.innerText = 'Author';
  authorInput.setAttribute('type', 'text');
  authorInput.required = true;
  authorInput.setAttribute('name', 'author');
  authorInput.setAttribute('id', 'author');
  const titleInput = document.createElement('input');
  const titleLabel = document.createElement('label');
  titleLabel.innerText = 'Title';
  titleLabel.setAttribute('for', 'title');
  titleInput.setAttribute('type', 'text');
  titleInput.required = true;
  titleInput.setAttribute('name', 'title');
  titleInput.setAttribute('id', 'title');
  const pageInput = document.createElement('input');
  const pageLabel = document.createElement('label');
  pageLabel.innerText = 'Pages';
  pageInput.required = true;
  pageInput.setAttribute('type', 'number');
  pageInput.setAttribute('name', 'page');
  pageInput.setAttribute('id', 'page');
  pageInput.setAttribute('min', '100');
  const wrapper = document.createElement('div');
  wrapper.className = 'wrapper mt-1';
  const readInput = document.createElement('input');
  const readLabel = document.createElement('label');
  readLabel.innerText = 'Read';
  readInput.setAttribute('type', 'checkbox');
  readInput.setAttribute('name', 'read');
  readInput.setAttribute('id', 'read');
  wrapper.appendChild(readLabel);
  wrapper.appendChild(readInput);
  const submitBtn = document.createElement('button');
  submitBtn.className = 'btn btn-success';
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
  form.appendChild(wrapper);
  form.appendChild(submitBtn);
  container.appendChild(form);
};
newBookBtn.addEventListener('click', newBookAction);


export default (bookArr) => {
  bookArr.forEach((book, idx) => {
    bookDiv = bookDiv.cloneNode(false);
    title.innerHTML = book.title;
    page.innerHTML = `Pages: ${book.pages}`;
    author.innerHTML = `Author: ${book.author}`;
    read.innerHTML = `Status: ${book.read ? 'Read' : 'Not Read'}`;
    readBtn.innerText = book.read ? 'Unread' : 'Read';
    readBtn.setAttribute('data-book-index', idx);
    const bookIdx = readBtn.getAttribute('data-book-index');
    const readBtnClone = readBtn.cloneNode(true);
    readBtnClone.onclick = () => storageModules.bookToggle(bookIdx);

    bookDiv.appendChild(title.cloneNode(true));
    bookDiv.appendChild(page.cloneNode(true));
    bookDiv.appendChild(author.cloneNode(true));
    bookDiv.appendChild(read.cloneNode(true));
    bookDiv.appendChild(readBtnClone);
    const deleteBtn = document.createElement('button');
    deleteBtn.innerText = 'Delete Book';
    deleteBtn.className = 'btn btn-secondary';
    deleteBtn.addEventListener('click', () => {
      storageModules.deleteBook(idx);
    });
    bookDiv.appendChild(deleteBtn);

    content.appendChild(bookDiv);
  });
};

document.getElementById('nav-id').appendChild(newBookBtn);
