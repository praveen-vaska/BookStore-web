const apiUrl = "http://localhost:5000/api/books";

async function loadBooks() {
    const response = await fetch(apiUrl);
    const books = await response.json();
    const booksContainer = document.getElementById("books");
    booksContainer.innerHTML = "";
    books.forEach((book) => {
        const bookDiv = document.createElement("div");
        bookDiv.classList.add("book-card");
        bookDiv.innerHTML = `
            <h2>${book.title}</h2>
            <p><strong>Author:</strong> ${book.author}</p>
            <p><strong>Price:</strong> $${book.price}</p>
            <a href="update.html?id=${book.id}">Update</a> |
            <a href="delete.html?id=${book.id}">Delete</a>
        `;
        booksContainer.appendChild(bookDiv);
    });
}

loadBooks();