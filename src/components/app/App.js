import "./App.css";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { increment, decrement } from "../../state/actions";
import { Container, Row, Col } from "react-bootstrap";
import BookCard from "../book-card/BookCard";
import axios from "axios";

const App = ({ count, increment, decrement }) => {

  const [isLoading, setIsLoading] = useState(true);
  const [books, setBooks] = useState([]);

  useEffect(() => {
    var config = {
      method: "get",
      url: "http://localhost:8080/EECS-4413-notAmazon/rest/books/allbooks",
      headers: {},
    };

    axios(config)
      .then((res) => {
        setBooks(res.data.allBooks);
        setIsLoading(false)
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  console.log(books);

  return (
    <div className="App">
      <Container>
        <h1>notAmazon</h1>
        <Row>
          {!isLoading && books.map((book) => (
            <Col lg={4}>
              <BookCard book={book} />
            </Col>
          ))}
        </Row>
      </Container>
      {/* <div>
          <h3>Redux State</h3>
          <button onClick={() => decrement()}>
            decrement
          </button>
          {count}
          <button onClick={() => increment()}>
            increment
          </button>
        </div> */}
    </div>
  );
};

const mapStateToProps = (state) => {
  console.log(state);
  return {
    count: state.count,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    increment: () => dispatch(increment()),
    decrement: () => dispatch(decrement()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
