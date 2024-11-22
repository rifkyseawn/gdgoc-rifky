import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import NoImageSelected from "../../assets/no-image-selected.jpg";

function EditBook() {
  const navigate = useNavigate();
  const urlSlug = useParams();
  const baseUrl = `https://gdgoc-rifky-backend.vercel.app//api/books/${urlSlug.slug}`;

  const [bookId, setBookId] = useState("");
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [author, setAuthor] = useState("");
  const [stars, setStars] = useState(0);
  const [description, setDescription] = useState("");
  const [categories, setCategories] = useState([]);
  const [thumbnail, setThumbnail] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [image, setImage] = useState("");

  const fetchData = async () => {
    try {
      const response = await fetch(baseUrl);

      if (!response.ok) {
        throw new Error("Failed to fetch data.");
      }

      const data = await response.json();
      setBookId(data.id);
      setTitle(data.title);
      setSlug(data.slug);
      setAuthor(data.author);
      setStars(data.stars);
      setCategories(data.category);
      setDescription(data.description);
      setThumbnail(data.thumbnail);
      setImage(`https://gdgoc-rifky-backend.vercel.app/uploads/${data.thumbnail}`);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const updateBook = async (e) => {
    e.preventDefault();
    console.table([title, slug, author]);

    const formData = new FormData();
    formData.append("bookId", bookId);
    formData.append("title", title);
    formData.append("slug", slug);
    formData.append("author", author);
    formData.append("stars", stars);
    formData.append("description", description);
    formData.append("category", categories.join(","));

    if (thumbnail) {
      formData.append("thumbnail", thumbnail);
    }

    try {
      const response = await fetch("https://gdgoc-rifky-backend.vercel.app/api/books", {
        method: "PUT",
        body: formData,
      });

      if (response.ok) {
        setSubmitted(true);
        setTimeout(() => {
          navigate("/books");
        }, 2000);
      } else {
        const errorData = await response.json();
        console.error(errorData);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleCategoryChange = (e) => {
    setCategories(e.target.value.split(",").map((category) => category.trim()));
  };

  const onImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImage(URL.createObjectURL(e.target.files[0]));
      setThumbnail(e.target.files[0]);
    }
  };

  const removeBook = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "https://gdgoc-rifky-backend.vercel.app/api/books/" + bookId,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        navigate("/books");
        console.log("Book removed.");
      } else {
        console.log("Failed to delete the book.");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Edit Book</h1>
      <p>
        This is where we use Node.js, Express, and MongoDB to retrieve some
        data. The data below is pulled from a MongoDB database.
      </p>

      <button onClick={removeBook} className="delete">
        Delete Book
      </button>

      {submitted ? (
        <p>Data submitted successfully!</p>
      ) : (
        <form className="bookdetails" onSubmit={updateBook}>
          <div className="col-1">
            <label>Upload Thumbnail</label>
            {image ? (
              <img src={`${image}`} alt="preview image" />
            ) : (
              <img
                src={`https://gdgoc-rifky-backend.vercel.app/uploads/${thumbnail}`}
                alt="preview image"
              />
            )}
            <input
              onChange={onImageChange}
              type="file"
              accept="image/gif, image/jpeg, image/png"
            />
          </div>

          <div className="col-2">
            <div>
              <label>Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            <div>
              <label>Slug</label>
              <input
                type="text"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                required
              />
            </div>

            <div>
              <label>Author</label>
              <input
                type="text"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                required
              />
            </div>

            <div>
              <label>Stars</label>
              <input
                type="number"
                value={stars}
                onChange={(e) => setStars(e.target.value)}
                min="0"
                max="5"
                required
              />
            </div>

            <div>
              <label>Description</label>
              <textarea
                rows="4"
                cols="50"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>

            <div>
              <label>Categories (comma-separated)</label>
              <input
                type="text"
                value={categories.join(", ")}
                onChange={handleCategoryChange}
                required
              />
            </div>

            <input type="submit" value="Update Book" />
          </div>
        </form>
      )}
    </div>
  );
}

export default EditBook;
