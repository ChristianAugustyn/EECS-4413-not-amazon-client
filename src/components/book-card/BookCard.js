import React from "react";
import { Card, Button } from 'react-bootstrap';
import bs from './BookCard.module.css'

const BookCard = ({ book }) => {
  return (
    <Card className={bs.card_container}>
      <Card.Img variant="top" src="http://covers.openlibrary.org/b/isbn/9780385533225-L.jpg" />
      <Card.Body>
        <Card.Title className={bs.title}>{book.title}</Card.Title>
        <Card.Text>
          <p>{book.price}</p>
          <p>{book.category}</p>
        </Card.Text>
        <Button variant="primary">View Book</Button>
      </Card.Body>
    </Card>
  );
};

export default BookCard;
