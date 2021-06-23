const wrapper = document.querySelector('.bslp');
const items = ['title', 'author', 'pages', 'language', 'year'];
const propertyStr = ['', 'By', 'Number of Pages:', 'Language:', 'Published:'];
let myLibrary = [];

function Book(title, author, pages, language, year, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.language = language;
  this.year = year;
  this.read = read;
}

function addBookToLibrary(title, author, pages, language, year, read) {
  title = prompt(':');
  author = prompt(':');
  pages = prompt(';');
  language = prompt(';');
  year = prompt(';');
  read = prompt(';');
  myLibrary.push(new Book(title, author, pages, language, year, read));

  const allBook = Array.from(document.querySelectorAll(`[data-book]`));
  const removeBookButton = document.querySelector('[data-addbook]');
  removeBookButton.remove();
  for (let i = 0; i < allBook.length; i++) {
    allBook[i].remove();
  }
  init();
}

function createBookCards() {
  for (let i = 0; i < myLibrary.length; i++) {
    const newCard = document.createElement('div');
    const newUL = document.createElement('ul');
    newCard.setAttribute('data-book', `${i}`);
    wrapper.appendChild(newCard);
    newUL.setAttribute('data-ul', `${i}`);
    newCard.appendChild(newUL);
    for (let j = 0; j < items.length; j++) {
      const newLI = document.createElement('li');
      newLI.setAttribute('data-li', `${j}`);
      newUL.appendChild(newLI);
    }
  }
}

function displayBooks() {
  const allUL = Array.from(document.querySelectorAll(`[data-ul]`));
  const bookTitle = Array.from(document.querySelectorAll(`[data-li='${0}']`));
  for (let i = 0; i < allUL.length; i++) {
    for (let j = 0; j < items.length; j++) {
      // For debug use
      console.log(allUL[i].childNodes[j]);
      allUL[i].childNodes[j].innerHTML = `${propertyStr[j]} ${
        myLibrary[i][items[j]]
      }`;
    }
  }
  // Make book title bold.
  bookTitle.forEach((item) => item.classList.add('book-titles'));
}

function addBookButton() {
  const buttonDiv = document.createElement('div');
  const button = document.createElement('button');
  buttonDiv.setAttribute('data-addBook', '0');
  button.innerHTML = '+';
  wrapper.appendChild(buttonDiv);
  buttonDiv.appendChild(button);

  button.addEventListener('click', () => {
    console.log('hello world');
    addBookToLibrary();
  });
}

function updateReadStatus() {
  const allBook = Array.from(document.querySelectorAll(`[data-book]`));
  allBook.forEach((ul) =>
    ul.addEventListener('click', (e) => {
      console.log(e.target.parentElement);
    })
  );
}

function init() {
  //   addBookToLibrary(
  //     'Introduction to Algorithms',
  //     'Wong',
  //     '999',
  //     'English',
  //     '1996',
  //     false
  //   );
  createBookCards();
  displayBooks();
  updateReadStatus();
  addBookButton();
}

init();
