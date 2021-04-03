import React from "react";
import { Card, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import bs from "./BookCard.module.css";

const BookCard = ({ book }) => {

    const history = useHistory();

  const currency = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "CAD",
  });

  return (
    <Card className={bs.card_container}>
      <Card.Img
        variant="top"
        src="http://covers.openlibrary.org/b/isbn/9780385533225-L.jpg"
      />
      <Card.Body>
        <Card.Title className={bs.title}>{book.title}</Card.Title>
        <Card.Text>
          <p>{currency.format(book.price)}</p>
          <p>{book.category}</p>
        </Card.Text>
        <Button variant="primary" onClick={() => history.push(`/book/${book.bid}`)}>
          View Book
        </Button>
      </Card.Body>
    </Card>
  );
};

export default BookCard;
