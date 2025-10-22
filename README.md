# library

---

Sent as a submission for [Project: Library](https://www.theodinproject.com/lessons/node-path-javascript-library).

---

The idea behind this project is to use objects and object constructors to create a dynamic library app. `script.js` sets the library to an initial state consisting of five books using the constructor function. The user can interact with the library by changing the status of a book to read/not read, by deleting a book, or by adding a new book. 

When the library is first loaded, the cover images are taken from the repository itself. When a user attempts to add a book, they will be required to select a cover image from their local files. Since the constructor needs a URL to access the cover image, a URL created with the [createObjectURL](https://developer.mozilla.org/en-US/docs/Web/API/URL/createObjectURL_static) method on the `<input type="file>"` file object will be passed to it. 

