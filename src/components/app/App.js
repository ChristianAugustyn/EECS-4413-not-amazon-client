import "./App.css";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { increment, decrement } from "../../state/actions";
import { Container, Row, Col, Jumbotron } from "react-bootstrap";
import BookCard from "../book-card/BookCard";
import logo from "../../static/logo512.png";
import axios from "axios";

const App = ({ count, increment, decrement }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [books, setBooks] = useState([]);

    useEffect(() => {
        var config = {
            method: "get",
            url:
                "https://eecs-4413-notamazon.mybluemix.net/rest/books/allbooks",
            headers: {},
        };

        axios(config)
            .then((res) => {
                setBooks(res.data.allBooks);
                setTimeout(() => {
                    setIsLoading(false);
                }, 200);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    return (
        <div className="App">
            <Jumbotron>
                <Container>
                    <Row>
                        <Col sm={12} lg={6}>
                            <div className='header'>
                                <h4>Welcome to,</h4>
                                <h1>
                                    notAmazon
                                </h1>
                                <p>The brick-and-mortar Mom & Pop book shop</p>
                            </div>
                        </Col>
                        <Col lg={6} className='logo d-sm-none d-lg-block'>
                            <img src={logo} />
                        </Col>
                    </Row>
                </Container>
            </Jumbotron>
            <Container>
                <Row>
                    {!isLoading &&
                        books.map((book) => (
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
