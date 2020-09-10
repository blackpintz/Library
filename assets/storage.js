export const myLibrary = localStorage.getItem('books')
  ? JSON.parse(localStorage.getItem('books'))
  : [];

localStorage.setItem('books', JSON.stringify(myLibrary));
JSON.parse(localStorage.getItem('books'));

export class Book {
  constructor(title, pages, author, read) {
    this.title = title;
    this.pages = pages;
    this.author = author;
    this.read = read;
  }
}

const update = () => {
  localStorage.setItem('books', JSON.stringify(myLibrary));
  window.location.reload();
};

export const addBookToLibrary = (title, pages, author, read) => {
  const book = new Book(title, pages, author, read);
  myLibrary.push(book);
  update();
};

export const bookToggle = (idx) => {
  myLibrary[idx].read = !myLibrary[idx].read;
  update();
};

export const deleteBook = (id) => {
  myLibrary.splice(id, 1);
  update();
};
