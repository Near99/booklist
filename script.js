const formSubmit = document.querySelector('.submit-form');
const addBookButton = document.querySelector('.add-book-button');
const formContainer = document.querySelector('.container');
const closeFormButton = document.querySelector('.form-close-button');
const grid = document.querySelector('.grid');
let removeBookButton = undefined;
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

class Display {
  static displayBook() {
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
    // Call remove function to update eventListener status;
    Display.removeBookFromList();
  }

  static removeBookFromList() {
    removeBookButton.forEach((button) => {
      button.addEventListener('click', (e) => {
        // console.log(e.target.parentElement.parentElement.children[1].innerText);
        // Remove the book from booklist array;
        // Here I assume no two books share the same name :>;
        // It should have a unique identifier for this job, but anyways..
        bookList.forEach((book, index) => {
          if (
            book.title ===
            e.target.parentElement.parentElement.children[1].innerText
          ) {
            bookList.splice(index, 1);
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

// Add new book form events control;
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
    let tmpBookInfo = new Book(
      titleInput,
      authorInput,
      pageInput,
      yearInput,
      languageInput
    );
    e.preventDefault();
    addNewBook(titleInput, authorInput, pageInput, yearInput, languageInput);
    formContainer.classList.remove('active');
    formSubmit.reset();
    Display.addBookToList(tmpBookInfo);
  });

  closeFormButton.addEventListener('click', () => {
    formContainer.classList.remove('active');
  });
};

addNewBook(
  'The Old Man and The Sea',
  'Charles Wong',
  222,
  '1959',
  'English',
  false
);
addNewBook(
  'Introduction to Algorithms',
  'Charles Wong',
  235,
  '2001',
  'English',
  false
);

// Display books and active form event controller;
document.addEventListener('DOMContentLoaded', () => {
  Display.displayBook();
  formEventController();
});
