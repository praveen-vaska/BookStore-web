from flask import Flask, request, jsonify
from flask_pymongo import PyMongo
from bson.objectid import ObjectId
from flask_cors import CORS

# Initialize Flask app
app = Flask(__name__)
CORS(app)

# Configure MongoDB
app.config["MONGO_URI"] = "mongodb://localhost:27017/BookStore-app"
mongo = PyMongo(app)
books_collection = mongo.db.books

# Create a new book (Add Book Page)
@app.route('/api/books', methods=['POST'])
def add_book():
    data = request.json
    if not data.get("title") or not data.get("author") or not data.get("price"):
        return jsonify({"error": "Title, Author, and Price are required"}), 400
    new_book = {
        "title": data["title"],
        "author": data["author"],
        "price": data["price"]
    }
    result = books_collection.insert_one(new_book)
    return jsonify({"message": "Book added", "id": str(result.inserted_id)}), 201

# Get all books (List Books Page)
@app.route('/api/books', methods=['GET'])
def get_books():
    books = []
    for book in books_collection.find():
        books.append({
            "id": str(book["_id"]),
            "title": book["title"],
            "author": book["author"],
            "price": book["price"]
        })
    return jsonify(books)

# Update a book by ID (Update Book Page)
@app.route('/api/books/<id>', methods=['PUT'])
def update_book(id):
    data = request.json
    updated_data = {
        "title": data.get("title"),
        "author": data.get("author"),
        "price": data.get("price")
    }
    result = books_collection.update_one({"_id": ObjectId(id)}, {"$set": updated_data})
    if result.matched_count == 0:
        return jsonify({"error": "Book not found"}), 404
    return jsonify({"message": "Book updated"})

# Delete a book by ID (Delete Book Page)
@app.route('/api/books/<id>', methods=['DELETE'])
def delete_book(id):
    result = books_collection.delete_one({"_id": ObjectId(id)})
    if result.deleted_count == 0:
        return jsonify({"error": "Book not found"}), 404
    return jsonify({"message": "Book deleted"})

#@app.route('/favicon.ico')
#def favicon():
  #  return '', 204  # Respond with no content

# Run the Flask app
if __name__ == '__main__':
    app.run(debug=True)
