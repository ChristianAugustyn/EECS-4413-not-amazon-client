import React, { useEffect, useState } from "react";
import {
    Container,
    Row,
    Col,
} from "react-bootstrap";
import _ from 'lodash'
import BookCard from '../book-card/BookCard'
import axios from "axios";

const SearchPage = ({ match, location }) => {

    
    const { name } = match.params;

    const [isLoading, setIsLoading] = useState(true);
    const [books, setBooks] = useState([]);

    useEffect(() => {
        var config = {
            method: "get",
            url: `http://localhost:8080/EECS-4413-notAmazon/rest/books/bookbyname?name=${name}`,
            headers: {},
        };

        axios(config)
            .then((response) => {
                setBooks(response.data.allBooks);
                setIsLoading(false);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [books]);

    return (
        <div>
            <Container>
                <h1 style={{ margin: "30px 0", textAlign: "center" }}>
                    Search for "{_.startCase(name)}"
                </h1>
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

export default SearchPage;
