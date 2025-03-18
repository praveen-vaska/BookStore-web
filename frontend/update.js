const apiUrl = "http://localhost:5000/api/books";

document.getElementById("updateBook").addEventListener("click", async () => {
    const id = document.getElementById("id").value;
    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;
    const price = document.getElementById("price").value;

    if (!id || !title || !author || !price) {
        alert("All fields are required!");
        return;
    }

    const response = await fetch(`${apiUrl}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, author, price }),
    });

    if (response.ok) {
        alert("Book updated successfully!");
    } else {
        alert("Error updating book");
    }
});
