//1 voy a crear el constructor de Book
function Book(title, author, numPages, read) {
  if (!title || !author) {
    throw new Error("Title and author are required");
  }
  if (typeof numPages !== "number" || numPages < 1) {
    throw new Error("Page count must be a positive number");
  }
  this.title = title;
  this.author = author;
  this.numPages = numPages;
  this.read = Boolean(read);
  this.id = crypto.randomUUID();
}
// voy a crear una function que al clickear el button, capture los valores del form, los guarde en variables,
// luego cree un Book con esas variables y me devuelva el newBook.

let myLibrary = [];

document
  .getElementById("bookForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    let title = document.getElementById("title").value.trim();
    let author = document.getElementById("author").value.trim();
    let pages = parseInt(document.getElementById("number-of-pages").value);
    let readValue = document.getElementById("read").value;

    if (!title || !author) {
      alert("Please complete title and author");
      return;
    }

    if (isNaN(pages) || pages < 1) {
      alert("Please insert valid numebr of pages");
      return;
    }

    if (!readValue) {
      alert("Please select Yes or No");
      return;
    }
    let readBoolean = readValue === "true";

    let newBook = new Book(title, author, pages, readBoolean);
    myLibrary.push(newBook);

    displayBook(newBook);

    console.log("Libro creado:", newBook);

    event.target.reset();

    return newBook;
  });

// hasta aca tengo el constructor de book hecho y la funcion que crea un libro desde el form y lo guarda en el array.
// voy a crear la funcion displayBook() quue muestre en el index.html los libros que voy agregando.
// esta funcion va a tomar los values de newBook y los va a insertar en un div id "bookOutput"

function displayBook(book) {
  let output = document.getElementById("bookOutput");

  let bookCard = document.createElement("div");
  bookCard.classList.add("book-card");
  bookCard.setAttribute("data-id", book.id);

  let bookTitle = document.createElement("h3");
  bookTitle.classList.add("book-title");
  bookTitle.textContent = `Book Title: ${book.title}`;

  let bookAuthor = document.createElement("p");
  bookAuthor.classList.add("book-autor");
  bookAuthor.textContent = `Author: ${book.author}`;

  let bookPages = document.createElement("p");
  bookPages.classList.add("book-pages");
  bookPages.textContent = `# of Pages: ${book.numPages}`;

  let bookRead = document.createElement("p");
  bookRead.classList.add("book-read");
  bookRead.textContent = `Book read?: ${book.read ? "Yes" : "No"}`;

  let bookId = document.createElement("p");
  bookId.classList.add("book-id");
  bookId.textContent = `Book ID: ${book.id}`;

  let deleteButton = document.createElement("button");
  deleteButton.classList.add("delete-btn");
  deleteButton.textContent = "Delete Book";

  deleteButton.addEventListener("click", () => {
    removeBook(book.id);
  });

  bookCard.appendChild(bookTitle);
  bookCard.appendChild(bookAuthor);
  bookCard.appendChild(bookPages);
  bookCard.appendChild(bookRead);
  bookCard.appendChild(bookId);
  bookCard.appendChild(deleteButton);

  output.appendChild(bookCard);
}

function removeBook(bookId) {
  let bookToRemove = myLibrary.find((book) => book.id === bookId);
  myLibrary = myLibrary.filter((book) => book.id !== bookId);
  let bookCard = document.querySelector(`[data-id='${bookId}']`);
  if (bookCard) {
    bookCard.remove();
  }

  console.log(`Libro ${bookToRemove.title} con ID ${bookId} eliminado`);
}
