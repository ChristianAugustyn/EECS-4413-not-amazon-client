import React, { useEffect, useState } from "react";
import {
    Container,
    Row,
    Col,
    Image,
    Button,
    ButtonGroup,
    Form,
    ProgressBar,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { increment, decrement, addToCart } from "../../state/actions";
import AddToast from '../add-toast/AddToast'
import bps from "./BookPage.module.css";
import ReviewCard from "../review-card/ReviewCard";
import BookReviewForm from "../book-review-form/BookReviewForm";
import axios from "axios";

const BookPage = ({ match, addToCart }) => {
    const history = useHistory();

    const currency = new Intl.NumberFormat("en-US", {
        //number formatter for the currency
        style: "currency",
        currency: "CAD",
    });

    const [showToast, setShowToast] = useState(false);

    const { bid } = match.params; //gets the bid from the url

    const [book, setBook] = useState({}); //holds the book object

    const [reviews, setReviews] = useState([]);

    const [avg, setAvg] = useState(0);

    const [isLoading, setIsLoading] = useState(true);

    const [quantity, setQuantity] = useState(1); //the quantity selector state

    const handleChange = (event) => {
        //handles the qty state
        const { id, value } = event.target;
        switch (id) {
            case "inc":
                setQuantity(quantity + 1);
                break;
            case "dec":
                setQuantity(quantity <= 0 ? 0 : quantity - 1);
                break;
            default:
                setQuantity(value);
                break;
        }
    };

    const handleAddToCart = () => {
        if (quantity === 0) {
            alert(
                "Error The quanity you selected is 0, please select a value greater than or equal to 1"
            );
            return;
        }

        addToCart({
            ...book,
            quantity: quantity,
        });
    };

    useEffect(() => {
        //used for "page side effects"
        const data = JSON.stringify({
            //sets up the bid for the body of the request as a JSON string "{"bid":"b001"}"
            bid: bid,
        });

        const config = {
            method: "post",
            url: "https://eecs-4413-notamazon.mybluemix.net/rest/books/getbook",
            headers: {
                "Content-Type": "application/json",
            },
            data: data,
        };

        axios(config) //sends a GET request from the book with the specific ID
            .then((res) => {
                setBook(res.data.book); //assigns the book object to the Book state
                // setIsLoading(false);
            })
            .then(() => {
                var config = {
                    method: "get",
                    url: `https://eecs-4413-notamazon.mybluemix.net/rest/reviews/reviewByBookId?bookId=${bid}`,
                    headers: {},
                };

                axios(config)
                    .then((response) => {
                        if (response.status === 200) {
                            setReviews(response.data.allReviews);
                        }
                    })
                    .then(() => {
                        var config = {
                            method: "get",
                            url: `https://eecs-4413-notamazon.mybluemix.net/rest/reviews/averageRatingByBookId?bookId=${bid}`,
                            headers: {},
                        };

                        axios(config)
                            .then((response) => {
                                setAvg(response.data.averageRating.avgRating);
                                setIsLoading(false);
                            })
                            .catch((error) => {
                                console.log(error);
                                setAvg(0);
                                setIsLoading(false);
                            });
                    })
                    .catch((error) => {
                        console.log(error);
                        setReviews([]);
                    });
            })
            .catch((error) => {
                console.log(error);
                history.push("/404");
            });
    }, [bid, reviews]);

    return (
        <div>
            <AddToast book={book} setShow={setShowToast} show={showToast} />
            <Container>
                {!isLoading && (
                    <>
                        <Row className={bps.container}>
                            <Col sm={12} md={6} lg={6}>
                                <Image style={{width: '80%'}}
                                    src={book.cover}
                                    rounded
                                />
                            </Col>
                            <Col sm={12} md={6} lg={6}>
                                <h3>{book.title}</h3>
                                <p>
                                    Price:{" "}
                                    <span className={bps.price}>
                                        {currency.format(book.price)}
                                    </span>
                                </p>
                                <p>
                                    Category:{" "}
                                    <span className={bps.category}>
                                        {book.category}
                                    </span>
                                </p>
                                <ButtonGroup className={bps.qty}>
                                    <Button id="dec" onClick={handleChange}>
                                        -
                                    </Button>
                                    <Form.Control
                                        className={bps.qty_form}
                                        id="qty"
                                        value={quantity}
                                        onChange={handleChange}
                                    />
                                    <Button id="inc" onClick={handleChange}>
                                        +
                                    </Button>
                                </ButtonGroup>
                                <Button
                                    className={bps.add_cart}
                                    onClick={handleAddToCart}
                                >
                                    Add To Cart
                                </Button>
                            </Col>
                        </Row>
                        <Row>
                            <Col sm={12}>
                                <h2 className={bps.review_header}>Reviews</h2>
                            </Col>
                            <Col sm={12} md={6} lg={6}>
                                <Row>
                                    <Col>
                                        <div style={{ textAlign: "center" }}>
                                            <h3>{avg <= 0 ? 0 : avg}</h3>
                                            <p>Average rating based on:</p>
                                            <p>
                                                {reviews.length}{" "}
                                                {reviews.length > 1 ||
                                                reviews.length < 1
                                                    ? "reviews"
                                                    : "review"}
                                            </p>
                                        </div>
                                    </Col>
                                    <Col>
                                        {[...Array(5)].map((_, index) => {
                                            const numOfReviews = reviews.filter(
                                                (review) =>
                                                    review.rating === index + 1
                                            ).length;
                                            const percentage =
                                                (numOfReviews /
                                                    reviews.length) *
                                                100;
                                            return (
                                                <div
                                                    className={
                                                        bps.review_results
                                                    }
                                                >
                                                    {[...Array(5)].map(
                                                        (e, i) => {
                                                            if (
                                                                i + 1 <=
                                                                index + 1
                                                            ) {
                                                                return (
                                                                    <FontAwesomeIcon
                                                                        icon={
                                                                            faStar
                                                                        }
                                                                        color="#fcba03"
                                                                    />
                                                                );
                                                            } else {
                                                                return (
                                                                    <FontAwesomeIcon
                                                                        icon={
                                                                            faStar
                                                                        }
                                                                    />
                                                                );
                                                            }
                                                        }
                                                    )}
                                                    <ProgressBar
                                                        now={
                                                            isNaN(percentage)
                                                                ? 0
                                                                : percentage
                                                        }
                                                        label={`${
                                                            isNaN(percentage)
                                                                ? 0
                                                                : percentage.toFixed()
                                                        }%`}
                                                    />
                                                </div>
                                            );
                                        })}
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <BookReviewForm bid={bid} />
                                    </Col>
                                </Row>
                            </Col>
                            <Col sm={12} md={6} lg={6}>
                                {!isLoading &&
                                    reviews.map((review) => (
                                        <ReviewCard review={review} />
                                    ))}
                            </Col>
                        </Row>
                    </>
                )}
            </Container>
        </div>
    );
};

const mapStateToProps = (state) => {
    //takes the values from the cart
    return {
        count: state.count,
        cart: state.cart,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        increment: () => dispatch(increment()),
        decrement: () => dispatch(decrement()),
        addToCart: (item) => dispatch(addToCart(item)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookPage);
