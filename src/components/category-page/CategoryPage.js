import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import BookCard from "../book-card/BookCard";
import axios from "axios";
import _ from 'lodash';

const CategoryPage = ({ match }) => {
    const { category } = match.params;

    const [isLoading, setIsLoading] = useState(true);
    const [books, setBooks] = useState([]);

    useEffect(() => {
        var config = {
            method: "get",
            url: `https://eecs-4413-notamazon.mybluemix.net/rest/books/bookbycat?cat=${category}`,
            headers: {},
        };

        axios(config)
            .then((response) => {
                console.log()
                setBooks(response.data.allBooks);
                setIsLoading(false);
            })
            .catch((error) => {
                console.log(error);
            });
            // eslint-disable-next-line
    }, []);

    return (
        <div>
            <Container>
                <h1 style={{margin: '30px 0', textAlign:'center'}}>{_.startCase(category)}</h1>
                <Row>
                    {!isLoading &&
                        books.map((book) => (
                            <Col lg={4}>
                                <BookCard book={book} />
                            </Col>
                        ))}
                </Row>
            </Container>
        </div>
    );
};

export default CategoryPage;
