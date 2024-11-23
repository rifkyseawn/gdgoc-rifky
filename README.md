# Book Management Application

## Overview

The Book Management Application is a web-based platform designed to manage a collection of books. It implements a RESTful API as part of the GDGOC UGM hacker study case for the Back-End role. The application also features a Front-End interface that allows users to interact with the API without needing tools like Postman.

You can access the live application at:
- [Frontend](https://gdgoc-rifky.vercel.app)
- [Backend API](https://gdgoc-rifky-backends.vercel.app/api/books)

If you prefer to run the application locally, you can clone the repository and deploy it yourself from the following link:
- [GitHub Repository](https://github.com/rifkyseawn/gdgoc-rifky/tree/localhost-branch)

## Getting Started

### Prerequisites

To run this application locally, ensure you have the following installed:
- Node.js (version 22.x)
- MongoDB (for database management)
- Git (for cloning the repository)

## Installation

1. **Clone the Repository**
bash git clone https://github.com/rifkyseawn/gdgoc-rifky.git cd gdgoc-rifky



   **Note**: To run the application locally, switch to the `localhost-branch`:
bash git checkout localhost-branch



2. **Install Dependencies**
   Navigate to both the client and server directories and install the required packages:
bash cd client npm install cd ../server npm install



3. **Set Up Environment Variables**
   Create a `.env` file in the server directory and add your MongoDB connection string:
plaintext MONGODB_URI=mongodb://:@localhost:27017/



4. **Run the Application**
   Start the server and client applications:
bash

In the server directory
npm run dev

In a new terminal, navigate to the client directory
cd client npm run dev



## API Endpoints

### `GET /api/books`

#### Description
Fetches all books in the collection.

#### Request Body
None.

#### Response
- **Status Code**: `200 OK`
- **Response Body**:
json { "data": [ { "id": n, "title": "yourtitle", "slug": "yourslug", "author": "yourauthor", "stars": n, "description": "yourdescription", "category": ["category1", "category2"], "thumbnail": "yourthumbnail.jpg", "createdAt": "yourcreationdate", "publishedAt": "yourpublicationdate", "updatedAt": "yourmodificationdate" } ] }



---

### `POST /api/books`

#### Description
Creates a new book entry in the collection.

#### Request Body
json { "title": "yourtitle", "slug": "yourslug", "author": "yourauthor", "stars": n, "description": "yourdescription", "category": "category1, category2", "thumbnail": "yourthumbnail.jpg" }



#### Response
- **Status Codes**:
  - `201 Created` on success.
  - `400 Bad Request` if required parameters are missing or JSON is invalid.
- **Response Body**:
json { "message": "Book created successfully", "data": { "id": n, "title": "yourtitle", "slug": "yourslug", "author": "yourauthor", "stars": n, "description": "yourdescription", "category": ["category1", "category2"], "thumbnail": "yourthumbnail.jpg", "createdAt": "yourcreationdate", "publishedAt": "yourpublicationdate", "updatedAt": "yourmodificationdate" } }



---

### `GET /api/books/:slug`

#### Description
Fetches a specific book by its slug.

#### Request Body
None.

#### Response
- **Status Codes**:
  - `200 OK` on success.
  - `404 Not Found` if the book with the specified slug does not exist.
- **Response Body**:
json { "data": { "id": n, "title": "yourtitle", "slug": "yourslug", "author": "yourauthor", "stars": n, "description": "yourdescription", "category": ["category1", "category2"], "thumbnail": "yourthumbnail.jpg", "createdAt": "yourcreationdate", "publishedAt": "yourpublicationdate", "updatedAt": "yourmodificationdate" } }



---

### `PUT /api/books`

#### Description
Updates an existing book entry by its ID.

#### Request Body
json { "bookId": "yourbookid", "title": "updatedtitle", "slug": "updatedslug", "author": "updatedauthor", "stars": n, "description": "updateddescription", "category": "updatedcategory1, updatedcategory2", "thumbnail": "updatedthumbnail.jpg" }



**Note**: You may include any combination of fields from `[title, slug, author, stars, description, category, thumbnail]`.

#### Response
- **Status Codes**:
  - `200 OK` on success.
  - `404 Not Found` if the book ID does not exist.
  - `400 Bad Request` if the JSON is invalid.
- **Response Body**:
json { "message": "Book updated successfully", "data": { "id": n, "title": "updatedtitle", "slug": "updatedslug", "author": "updatedauthor", "stars": n, "description": "updateddescription", "category": ["updatedcategory1", "updatedcategory2"], "thumbnail": "updatedthumbnail.jpg", "createdAt": "yourcreationdate", "publishedAt": "yourpublicationdate", "updatedAt": "yourmodificationdate" } }



---

### `DELETE /api/books/:id`

#### Description
Deletes a book entry by its ID.

#### Request Body
None.

#### Response
- **Status Codes**:
  - `200 OK` on success.
  - `404 Not Found` if the book ID does not exist.
- **Response Body**:
json { "message": "Book deleted successfully" }



---

## Conclusion

This documentation provides a comprehensive overview of the API endpoints available in the Book Management Application. It includes detailed descriptions of each endpoint, the expected request and response formats, and the possible status codes. This should assist developers and users in effectively utilizing the API for their needs.

For any questions or further assistance, please feel free to reach out via the GitHub repository or contact the project maintainer.
