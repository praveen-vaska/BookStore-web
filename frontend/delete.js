const apiUrl = "http://localhost:5000/api/books";

document.getElementById("deleteBook").addEventListener("click", async () => {
    const id = document.getElementById("id").value;

    if (!id) {
        alert("Book ID is required!");
        return;
    }

    const response = await fetch(`${apiUrl}/${id}`, {
        method: "DELETE",
    });

    if (response.ok) {
        alert("Book deleted successfully!");
        document.getElementById("id").value = "";
    } else {
        alert("Error deleting book");
        document.getElementById("id").value = "";
    }
});
