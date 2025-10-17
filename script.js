const myLibrary = [];

function Book(title, author, pages, read) {
  if (!new.target) {
    throw Error("You must use the 'new' operator to call the constructor");
  }  
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.bookId = crypto.randomUUID();
  this.info = function() {
    const isRead = read ? "read" : "not read yet";
    return title + " by " + author + `, ${pages} pages, ` + isRead;
  };
}

function addBookToLibrary() {
  
}