export const myLibrary = localStorage.getItem('books')
  ? JSON.parse(localStorage.getItem('books'))
  : [];

localStorage.setItem('books', JSON.stringify(myLibrary));
JSON.parse(localStorage.getItem('books'));

export function Book(title, pages, author, read) {
  this.title = title;
  this.pages = pages;
  this.author = author;
  this.read = read;
}

export function addBookToLibrary(title, pages, author, read) {
  const book = new Book(title, pages, author, read);
  myLibrary.push(book);
  localStorage.setItem('books', JSON.stringify(myLibrary));
  window.location.reload();
}

export function bookToggle(idx) {
  myLibrary[idx].read = !myLibrary[idx].read;
  localStorage.setItem('books', JSON.stringify(myLibrary));
  window.location.reload();
}

export function deleteBook(id) {
  myLibrary.splice(id, 1);
  localStorage.setItem('books', JSON.stringify(myLibrary));
  window.location.reload();
}
