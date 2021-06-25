const wrapper = document.querySelector('.bslp');
const closeFormContainer = document.querySelector('.close-form-container');
const formContainer = document.querySelector('.form-container');
const bookInfoForm = document.querySelector('.book-info');
const bookInfo = ['title', 'author', 'pages', 'language', 'year'];
const propertyStr = ['', 'By', 'Number of Pages:', 'Language:', 'Published:'];
let myLibrary = []; // Store this array somewhere

function Book(title, author, pages, language, year, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.language = language;
  this.year = year;
  this.read = read;
}

function addBookToLibrary(title, author, pages, language, year, read) {
  myLibrary.push(new Book(title, author, pages, language, year, read));
  reset();
  init();
}

myLibrary.push(new Book('JS', 'Charles', '399', 'English', '1996', false));
myLibrary.push(new Book('Node.js', 'Charles', '399', 'English', '1996', true));

function createBookCards() {
  for (let i = 0; i < myLibrary.length; i++) {
    const newCard = document.createElement('div');
    const newUL = document.createElement('ul');
    newCard.setAttribute('data-book', `${i}`);
    wrapper.appendChild(newCard);
    newUL.setAttribute('data-ul', `${i}`);
    if (myLibrary[i].read === true) {
      newUL.classList.add('haveRead');
    }
    newCard.appendChild(newUL);
    for (let j = 0; j < bookInfo.length; j++) {
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
    for (let j = 0; j < bookInfo.length; j++) {
      // For debug use
      // console.log(allUL[i].childNodes[j]);
      allUL[i].childNodes[j].innerHTML = `${propertyStr[j]} ${
        myLibrary[i][bookInfo[j]]
      }`;
    }
  }
  // Make book title bold.
  bookTitle.forEach((item) => item.classList.add('book-titles'));
}

function addNewBookButton() {
  const buttonDiv = document.createElement('div');
  const button = document.createElement('button');
  button.classList.add('addNewBook');
  buttonDiv.setAttribute('data-addBook', '0');
  button.innerHTML = '+';
  wrapper.appendChild(buttonDiv);
  buttonDiv.appendChild(button);
  button.addEventListener('click', () => {
    // addBookToLibrary();
    formContainer.classList.add('active');
    closeFormContainer.addEventListener('click', () => {
      formContainer.classList.remove('active');
    });
  });
}

function addNewBookForm() {
  bookInfoForm.addEventListener('submit', (e) => {
    const titleInput = document.getElementById('title').value;
    const authorInput = document.getElementById('author').value;
    const pageInput = document.getElementById('page').value;
    const languageInput = document.getElementById('language').value;
    const yearInput = document.getElementById('year').value;
    const readInput = document.getElementById('read').checked;
    e.preventDefault();
    addBookToLibrary(
      titleInput,
      authorInput,
      pageInput,
      languageInput,
      yearInput,
      readInput
    );
    formContainer.classList.remove('active');
    bookInfoForm.reset();
  });
}

function removeAndReadButton() {
  const allBook = Array.from(document.querySelectorAll(`[data-book]`));
  for (let i = 0; i < allBook.length; i++) {
    const buttonContainer = document.createElement('div');
    const removeButton = document.createElement('button');
    const readButton = document.createElement('button');
    buttonContainer.classList.add('rmarbut');
    removeButton.setAttribute('data-remove', `${i}`);
    readButton.setAttribute('data-read', `${i}`);
    removeButton.innerHTML = 'Remove';
    readButton.innerHTML = 'Read';
    allBook[i].appendChild(buttonContainer);
    buttonContainer.appendChild(readButton);
    buttonContainer.appendChild(removeButton);
  }
  const removeBook = document.querySelectorAll('[data-remove]');
  removeBook.forEach((r) =>
    r.addEventListener('click', (e) => {
      for (let j = 0; j < myLibrary.length; j++) {
        if (Number(e.target.attributes[0].nodeValue) === j) {
          // For debug use
          // console.log(e.target.attributes[0].nodeValue);
          myLibrary.splice(j, 1);
          reset();
          init();
        }
      }
    })
  );
}

function updateReadStatus() {
  const allBook = Array.from(document.querySelectorAll(`[data-read]`));
  allBook.forEach((ul) =>
    ul.addEventListener('click', (e) => {
      // For Debug use
      // console.log(e.target.parentElement.parentElement.firstChild);
      // console.log(e.target.parentNode.parentNode.attributes[0].nodeValue);
      if (
        myLibrary[
          Number(e.target.parentNode.parentNode.attributes[0].nodeValue)
        ].read == true
      ) {
        e.target.parentElement.parentElement.firstChild.classList.remove(
          'haveRead'
        );
        myLibrary[
          Number(e.target.parentNode.parentNode.attributes[0].nodeValue)
        ].read = false;
        return;
      }

      if (
        myLibrary[
          Number(e.target.parentNode.parentNode.attributes[0].nodeValue)
        ].read !== true
      ) {
        myLibrary[
          Number(e.target.parentNode.parentNode.attributes[0].nodeValue)
        ].read = true;
        e.target.parentElement.parentElement.firstChild.classList.add(
          'haveRead'
        );
      }
    })
  );
}

function reset() {
  const allBook = Array.from(document.querySelectorAll(`[data-book]`));
  const removeBookButton = document.querySelector('[data-addbook]');
  removeBookButton.remove();
  for (let i = 0; i < allBook.length; i++) {
    allBook[i].remove();
  }
}

function init() {
  createBookCards();
  displayBooks();
  addNewBookButton();
  addNewBookForm();
  removeAndReadButton();
  updateReadStatus();
}

init();
