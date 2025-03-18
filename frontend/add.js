const apiUrl = "http://localhost:5000/api/books";

document.getElementById("addBook").addEventListener("click", async () => {
    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;
    const price = document.getElementById("price").value;

    if (!title || !author || !price) {
        alert("All fields are required!");
        return;
    }

    const response = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, author, price }),
    });

    if (response.ok) {
        alert("Book added successfully!");
        document.getElementById("title").value = "";
        document.getElementById("author").value = "";
        document.getElementById("price").value = "";
    } else {
        alert("Error adding book");
    }
});
