// https://movies-api-jbrv.onrender.com

import PropTypes from "prop-types";
import { Button, Row, Col, Card, Container, Figure } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useParams } from "react-router";
import { useEffect, useState } from "react";

export const MovieView = ({ movies, user, token, updateUser }) => {
  const { movieId } = useParams();
  const movie = movies.find((m) => m.id === movieId);
  // const movies = useSelector((state) => state.movies.list)
  // const similarMovies = movies.filter((movie) =>
  //   movie.Genre === movie.Genre ? true : false
  // );

  const [isFavorite, setIsFavorite] = useState(
    user.FavoriteMovies.includes(movie._id)
  );

  useEffect(() => {
    setIsFavorite(user.FavoriteMovies.includes(movie._id));
  }, [movieId]);

  const addFavorite = (event) => {
    event.preventDefault()
    fetch(
      `https://movies-api-jbrv.onrender.com/users/${user.Username}/movies/${movieId}`,
      {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      }
    )
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          alert("Failed");
          return false;
        }
      })
      .then((user) => {
        if (user) {
          alert("Successfully added to favorites");
          setIsFavorite(true);
          updateUser(user);
        }
      })
      .catch((e) => {
        alert(e);
      });
  };


  const removeFavorite = () => {
    fetch(
      `https://movies-api-jbrv.onrender.com/users/${user.Username}/movies/${movieId}`,
      {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      }
    )
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          alert("Failed");
          return false;
        }
      })
      .then((user) => {
        if (user) {
          alert("Successfully deleted from favorites");
          setIsFavorite(false);
          updateUser(user);
        }
      })
      .catch((e) => {
        alert(e);
      });
  };

  return (
    <Container>
     
        <Card style={{ width: '50rem' }}>
        <Row>
          <Col>
            <Figure>
              <Card.Img variant="top" src={movie.image} alt="movie poster"/>
            </Figure>
          </Col>

          <Col>
            <Card.Body>
              <Card.Title>{movie.title}</Card.Title>
              <Card.Text><b>Description:</b> {movie.description}</Card.Text>
              <Card.Text><b>Genre:</b> {movie.genre.name}</Card.Text>
              <Card.Text><b>Director:</b> {movie.director.name}</Card.Text>
              <Link to={"/"}>
            <Button variant="light">Back</Button>
            {isFavorite ? (
            <Button variant="danger" className="" onClick={removeFavorite}>
              Remove from favorites
            </Button>
          ) : (
            <Button variant="success" className="" onClick={addFavorite}>
              Add to favorites
            </Button>
          )}
              </Link>
              </Card.Body>  
            </Col>
          </Row>
        </Card>
    </Container>
  );
};

MovieView.propTypes = {
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
      directors: PropTypes.shape({
        name: PropTypes.string
      }),
      genre: PropTypes.shape({
        name: PropTypes.string
      })
    }).isRequired
  ),
};