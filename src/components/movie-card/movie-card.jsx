import React from "react";
import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

export const MovieCard = ({ movie }) => {
  return (
    <Card className="h-200">
      <Card.Img variant="top" src={movie.image} className="h-200" />
      <Card.Body>
        <Card.Title>{movie.title}</Card.Title>
        <Card.Text>Director Test test: {movie.director.name}</Card.Text>
        <Link to={`/movies/${encodeURIComponent(movie.id)}`}
          className="mt-auto">
          <Button variant="info"> details </Button>
        </Link>
      </Card.Body>
    </Card>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    directors: PropTypes.shape({
      name: PropTypes.string
    }),
    genre: PropTypes.shape({
      name: PropTypes.string
    })
  }).isRequired
};
