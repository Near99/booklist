const addBookButton = document.querySelector('.add-book-button');
const formSubmit = document.querySelector('.submit-form');
const formContainer = document.querySelector('.container');
const formCloseButton = document.querySelector('.form-close-button');
const grid = document.querySelector('.grid');
let removeBookButton = undefined;
let isRead = undefined;
let bookList = [];

class Book {
  constructor(title, author, page, year, language, read) {
    this.title = title;
    this.author = author;
    this.page = page;
    this.year = year;
    this.language = language;
    this.read = read;
  }
}

class Store {
  static getBooks() {
    let books;
    if (localStorage.getItem('books') === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem('books'));
    }
    return books;
  }

  static addBook(book) {
    const books = Store.getBooks();
    books.push(book);
    localStorage.setItem('books', JSON.stringify(books));
  }

  static removeBook(title) {
    const books = Store.getBooks();
    books.forEach((book, index) => {
      if (book.title === title) {
        books.splice(index, 1);
      }
    });

    localStorage.setItem('books', JSON.stringify(books));
  }

  static updateBook(title) {
    const books = Store.getBooks();
    books.forEach((book) => {
      if (book.title === title) {
        book.read = true;
      }
    });

    localStorage.setItem('books', JSON.stringify(books));
  }
}

class Display {
  static displayBook() {
    bookList = Store.getBooks();
    bookList.forEach((book) => {
      this.addBookToList(book);
    });
  }

  static addBookToList(book) {
    const newCard = document.createElement('div');
    let readingStatus = 'Reading';
    newCard.classList.add('card');
    // If the book is been read, add have-read class and set readingStatus to Done Reading;
    if (book.read === true) {
      newCard.classList.add('have-read');
      readingStatus = 'Done Reading';
    }
    newCard.innerHTML = `
      <div class="remove">
       <p>×</p>
      </div>
      <div class="header">
       <h2>${book.title}</h2>
      </div>
      <div class="book-info">
       <h4>Written by ${book.author}</h4>
       <h4>${book.page} Pages</h4>
       <h4>Published in ${book.year}</h4>
       <h4>Language: ${book.language}</h4>
      </div>
      <div class="read-status">
       <p class="read-status-text">${readingStatus}</p>
      </div>
    `;
    grid.appendChild(newCard);
    // Select all elements with remove class when new book is added;
    removeBookButton = Array.from(document.querySelectorAll('.remove'));
    // SSelect all elements with read-status;
    isRead = Array.from(document.querySelectorAll('.read-status'));
    // Call remove and update reading status function to update eventListener status;
    Display.removeBookFromList();
    Display.updateReadStatus();
    // Store.addBook(book);
  }

  static updateReadStatus() {
    isRead.forEach((button) => {
      button.addEventListener('click', (e) => {
        bookList.forEach((book) => {
          if (
            book.title ===
            e.target.parentElement.parentElement.children[1].innerText
          ) {
            book.read = true;
            e.target.parentElement.parentElement.classList.add('have-read');
            e.target.innerText = 'Done Reading';
            Store.updateBook(book.title);
          }
        });
      });
    });
  }

  static removeBookFromList() {
    removeBookButton.forEach((button) => {
      button.addEventListener('click', (e) => {
        // Remove the book from booklist array;
        // Here I assume no two books share the same name :>;
        // It should have a unique identifier for this job, but anyways..
        bookList.forEach((book, index) => {
          if (
            book.title ===
            e.target.parentElement.parentElement.children[1].innerText
          ) {
            bookList.splice(index, 1);
            Store.removeBook(book.title);
          }
        });
        // Remove DOM element;
        e.target.parentElement.parentElement.remove();
      });
    });
  }
}

// Push book information object to bookList arr;
const addNewBook = (title, author, page, year, language, read) => {
  bookList.push(new Book(title, author, page, year, language, read));
};

// Add-new-book-form events control;
const formEventController = () => {
  addBookButton.addEventListener('click', () => {
    formContainer.classList.add('active');
  });

  formSubmit.addEventListener('submit', (e) => {
    const titleInput = document.getElementById('title').value;
    const authorInput = document.getElementById('author').value;
    const pageInput = document.getElementById('page').value;
    const yearInput = document.getElementById('year').value;
    const languageInput = document.getElementById('language').value;
    let read = false;
    let tmpBookInfo = new Book(
      titleInput,
      authorInput,
      pageInput,
      yearInput,
      languageInput,
      read
    );
    e.preventDefault();
    addNewBook(
      titleInput,
      authorInput,
      pageInput,
      yearInput,
      languageInput,
      read
    );
    formContainer.classList.remove('active');
    formSubmit.reset();
    Display.addBookToList(tmpBookInfo);
    Store.addBook(tmpBookInfo);
  });

  formCloseButton.addEventListener('click', () => {
    formContainer.classList.remove('active');
  });
};

// Display books and active form event controller;
document.addEventListener('DOMContentLoaded', () => {
  Display.displayBook();
  formEventController();
});
