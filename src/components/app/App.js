import "./App.css";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { increment, decrement } from "../../state/actions";
import { Container, Row, Col, Jumbotron } from "react-bootstrap";
import BookCard from "../book-card/BookCard";
import {useSpring, animated} from 'react-spring'
import axios from "axios";

const App = ({ count, increment, decrement }) => {

  const animation = useSpring({opacity: 1, from: {opacity: 0}})

  const [isLoading, setIsLoading] = useState(true);
  const [books, setBooks] = useState([]);

  useEffect(() => {
    var config = {
      method: "get",
      url: "https://eecs-4413-notamazon.mybluemix.net/rest/books/allbooks",
      headers: {},
    };

    axios(config)
      .then((res) => {
        setBooks(res.data.allBooks);
        setTimeout(() => {
          setIsLoading(false)
        }, 200)
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="App">
      <Jumbotron>
        <animated.h1 style={animation}>Welcome to notAmazon</animated.h1>
        <p>The brick-and-mortar Mom & Pop book shop</p>
      </Jumbotron>
      <Container>
        <Row>
          {!isLoading && books.map((book) => (
            <Col sm={6} md={6} lg={4}>
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
