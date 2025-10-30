const myLibrary = [];

class Book {
  constructor(title, author, pages, read, coverHref) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.bookId = crypto.randomUUID();
    this.coverHref = coverHref;
    this.info = function() {
      const isRead = read ? "read" : "not read yet";
      return title + " by " + author + `, ${pages} pages, ` + isRead;
    };
  }
}

function addBookToLibrary(title, author, pages, read, coverHref) {
  const book = new Book(title, author, pages, read, coverHref);
  myLibrary.push(book);

  const readClass = (read == 1) ? "read" : "not-read";
  const readText = (read == 1) ? "Read" : "Not Read";
  const initialStatus = (read == 1) ? "checked" : "";
  const tableBody = document.querySelector("tbody");
  const largeHTMLString = `
         <tr>
          <td>
            <div class="cover-container">
              <div class="book-cover" style="background-image: url(${book.coverHref}); background-size: cover;"></div>
            </div>
          </td>
          <td>${book.author}</td>
          <td>${book.title}</td>
          <td>${book.pages}</td>
          <td>
            <div class="book-status-container">
              <div class="book-status ${readClass}">${readText}</div>
            </div>
          </td>
          <td>
            <div class="modify-status-container">
              <button class="delete-button">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>delete</title><path d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z" /></svg>
              </button>
              <input type="checkbox" class="book-status-modifier" ${initialStatus} title="modify status">
            </div>
          </td>
        </tr> 
  `;

  tableBody.innerHTML += largeHTMLString;
}

addBookToLibrary('Nineteen Eighty-Four', 'George Orwell', '355', 1, 'assets/1984.jpg');
addBookToLibrary('The Mysterious Island', 'Jules Verne', '766', 1, 'assets/laIslaMisteriosa.jpg');
addBookToLibrary('One Day in the Life of Ivan Denisovich', 'Alexander Solzhenitsyn', '181', 0, 'assets/oneDayInTheLifeOfIvan.jpg');
addBookToLibrary('The Oxford Murders', 'Guillermo Martinez', '243', 1, 'assets/crimenes-imperceptibles-nueva-ed.jpg');
addBookToLibrary('Alice in Wonderland', 'Lewis Carroll', '157', 1, 'assets/Alice-in-Wonderland-CE-head_on.jpg');

function addModifyStatusFunctionality() {
  const modifyStatusSliders = document.querySelectorAll('.book-status-modifier');
  modifyStatusSliders.forEach((slider, index) => {
    slider.addEventListener('click', () => {
      const bookStatus = slider.checked;
      myLibrary[index].read = bookStatus ?  1 : 0;

      const parentRow = slider.closest('tr');
      const bookStatusDiv = parentRow.querySelector('.book-status');
      bookStatusDiv.className = bookStatus ? "book-status read" : "book-status not-read";
      bookStatusDiv.textContent = bookStatus ? "Read" : "Not Read";   
    });
  })
}

addModifyStatusFunctionality();

function removeModifyStatusFunctionality() {
  const modifyStatusSliders = document.querySelectorAll('.book-status-modifier');
  modifyStatusSliders.forEach((slider) => {
    slider.replaceWith(slider.cloneNode(true));
  })
}

let currentDeletionIndex;

function addDeletionButtonFunctionality() {
  let deleteButtons = document.querySelectorAll('.delete-button');
  deleteButtons.forEach((button, index) => {
    button.addEventListener('click', () => {
      const deletionDialog = document.querySelector('#deletion-dialog');
      deletionDialog.showModal();
      currentDeletionIndex = index;
    })
  })
}

addDeletionButtonFunctionality();

const deleteConfirmationButton = document.querySelector('.deletion-dialog-row:last-child > button');
deleteConfirmationButton.addEventListener('click', () => {
  myLibrary.splice(currentDeletionIndex, 1);
  const tableBody = document.querySelector('tbody');
  const rowToDelete = tableBody.querySelector(`tr:nth-of-type(${currentDeletionIndex + 1})`);
  rowToDelete.remove();
  removeModifyStatusFunctionality();
  addModifyStatusFunctionality();
  addDeletionButtonFunctionality();

  const deletionDialog = document.querySelector('#deletion-dialog');
  deletionDialog.close();
})

const addBookButton = document.querySelector('#add-book');
addBookButton.addEventListener('click', () => {
  const addBookDialog = document.querySelector('#add-book-dialog');
  addBookDialog.showModal();
})

const addBookConfirmationButton = document.querySelector('.add-book-dialog-row:last-child > button');
addBookConfirmationButton.addEventListener('click', () => {
  if(document.querySelector('#author').checkValidity() && document.querySelector('#title').checkValidity()
  && document.querySelector('#number-of-pages').checkValidity() && document.querySelector('#cover').checkValidity()) {
    const author = document.querySelector('#author').value;
    const title = document.querySelector('#title').value;
    const numberOfPages = document.querySelector('#number-of-pages').value;
    const coverUrl = URL.createObjectURL(document.querySelector('#cover').files[0]);

    addBookToLibrary(title, author, numberOfPages, 0, coverUrl);

    removeModifyStatusFunctionality();
    addModifyStatusFunctionality();
    addDeletionButtonFunctionality();
  }
})

const closeDialogButtons = document.querySelectorAll('.close-dialog');
closeDialogButtons.forEach((button) => {
  const parentDialog = button.closest('dialog');
  button.addEventListener('click', () => parentDialog.close());
})

class Books {
  constructor(title, author, pages, read, coverHref) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.bookId = crypto.randomUUID();
    this.coverHref = coverHref;
    this.info = function() {
      const isRead = read ? "read" : "not read yet";
      return title + " by " + author + `, ${pages} pages, ` + isRead;
    };
  }
}