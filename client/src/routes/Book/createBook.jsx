import React, { useState } from "react";
import NoImageSelected from "../../assets/no-image-selected.jpg";

function CreateBook() {
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [author, setAuthor] = useState("");
  const [stars, setStars] = useState(0);
  const [description, setDescription] = useState("");
  const [categories, setCategories] = useState([]);
  const [thumbnail, setThumbnail] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [image, setImage] = useState(NoImageSelected);

  const createBook = async (e) => {
    e.preventDefault();
    console.table([title, slug, author]);

    const formData = new FormData();
    formData.append("title", title);
    formData.append("slug", slug);
    formData.append("author", author);
    formData.append("stars", stars);
    formData.append("description", description);
    formData.append("category", categories.join(","));
    formData.append("thumbnail", thumbnail);

    try {
      const response = await fetch("http://localhost:8000/api/books", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log(responseData);
        setTitle("");
        setSlug("");
        setAuthor("");
        setStars(0);
        setDescription("");
        setCategories([]);
        setThumbnail(null);
        setImage(NoImageSelected);
        setSubmitted(true);
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

  return (
    <div>
      <h1>Create Book</h1>
      <p>
        This is where we use Node.js, Express, and MongoDB to retrieve some
        data. The data below is pulled from a MongoDB database.
      </p>

      {submitted ? (
        <p>Data submitted successfully!</p>
      ) : (
        <form className="bookdetails" onSubmit={createBook}>
          <div className="col-1">
            <label>Upload Thumbnail</label>
            <img src={image} alt="preview image" />
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

            <input type="submit" value="Create Book" />
          </div>
        </form>
      )}
    </div>
  );
}

export default CreateBook;
