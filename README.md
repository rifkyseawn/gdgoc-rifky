# gdgoc-rifky
This is where we use Node.js, Express, and MongoDB to retrieve some data. The data below is pulled from a MongoDB database.

# Getting Started

This web app is available at [https://gdgoc-rifky.vercel.app](https://gdgoc-rifky.vercel.app).

This project is primarily designed to implement a REST API as required in the GDGOC UGM hacker study case for the Back-End role. Additionally, it includes some Front-End components to assist users who may not have tools like Postman to test the API directly on the web.

## Endpoints

### `api/books`

#### Method: GET
**Description**: Read all items.

**Request body**: None.

**Response status**:
- `200` on success.

**Response body**:
json { "data": [ { "id": n, "title": "yourtitle", "slug": "yourslug", "author": "yourauthor", "stars": n, "description": "yourdescription", "category": ["category1", "category2"], "thumbnail": "yourthumbnail.jpg", "createdAt": "yourcreationdate", "publishedAt": "yourpublicationdate", "updatedAt": "yourmodificationdate" } ] }



---

#### Method: POST
**Description**: Create a new item.

**Request body**:
json { "title": "yourtitle", "slug": "yourslug", "author": "yourauthor", "stars": n, "description": "yourdescription", "category": "category1, category2", "thumbnail": "yourthumbnail.jpg" }



**Response status**:
- `201` on success.
- `400` if parameters are missing or JSON is invalid.

**Response body**:
json { "message": "Book created successfully", "data": { "id": n, "title": "yourtitle", "slug": "yourslug", "author": "yourauthor", "stars": n, "description": "yourdescription", "category": ["category1", "category2"], "thumbnail": "yourthumbnail.jpg", "createdAt": "yourcreationdate", "publishedAt": "yourpublicationdate", "updatedAt": "yourmodificationdate" } }



---

### `api/books/[book_id]`

#### Method: GET
**Description**: Read item by book ID.

**Request body**: None.

**Response status**:
- `200` on success.
- `404` if book ID not found.

**Response body**:
json { "data": { "id": n, "title": "yourtitle", "slug": "yourslug", "author": "yourauthor", "stars": n, "description": "yourdescription", "category": ["category1", "category2"], "thumbnail": "yourthumbnail.jpg", "createdAt": "yourcreationdate", "publishedAt": "yourpublicationdate", "updatedAt": "yourmodificationdate" } }



---

#### Method: PUT
**Description**: Update item by book ID.

**Request body**:
json { "title": "updatedtitle", "slug": "updatedslug", "author": "updatedauthor", "stars": n, "description": "updateddescription", "category": "updatedcategory1, updatedcategory2", "thumbnail": "updatedthumbnail.jpg" }


**Note**: May contain any number of fields from `[title, slug, author, stars, description, category, thumbnail]`.

**Response status**:
- `200` on success.
- `404` if book ID not found.
- `400` if JSON is invalid.

**Response body**:
json { "message": "Book updated successfully", "data": { "id": n, "title": "updatedtitle", "slug": "updatedslug", "author": "updatedauthor", "stars": n, "description": "updateddescription", "category": ["updatedcategory1", "updatedcategory2"], "thumbnail": "updatedthumbnail.jpg", "createdAt": "yourcreationdate", "publishedAt": "yourpublicationdate", "updatedAt": "yourmodificationdate" } }



---

#### Method: DELETE
**Description**: Delete item by book ID.

**Request body**: None.

**Response status**:
- `200` on success.
- `404` if book ID not found.

**Response body**:
json { "message": "Book deleted successfully" }



---

## Conclusion

This documentation provides a comprehensive overview of the API endpoints available in the Book Management applicatio
