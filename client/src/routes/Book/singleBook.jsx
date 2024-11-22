import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

function SingleBook() {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const urlSlug = useParams();
  const baseUrl = `http://localhost:8000/api/books/${urlSlug.slug}`;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(baseUrl);

        if (!response.ok) {
          throw new Error("Failed to fetch data.");
        }

        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        console.log(error);
        setError("Error fetching book data. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [baseUrl]);

  function StarRating({ numberOfStars }) {
    const stars = [];

    for (let i = 0; i < numberOfStars; i++) {
      stars.push(<span key={i}>⭐</span>);
    }

    return (
      <div>Rating: {stars.length > 0 ? stars : "No rating available"}</div>
    );
  }

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!data) {
    return <p>No book found.</p>;
  }

  return (
    <div>
      <Link to={"/books"}>🔙 Books</Link>

      <div className="bookdetails">
        <div className="col-1">
          <img
            src={`http://localhost:8000/uploads/${data.thumbnail}`}
            alt={data.title}
            style={{ width: "200px", height: "auto" }}
          />
          <Link to={`/editbook/${data.slug}`}>Edit</Link>
        </div>

        <div className="col-2">
          <h1>{data.title}</h1>
          <h3>{data.author}</h3>
          <p>{data.description}</p>
          <StarRating numberOfStars={data.stars} />

          <p>Published At: {new Date(data.publishedAt).toLocaleDateString()}</p>
          <p>Category</p>
          <ul>
            {data.category.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default SingleBook;
