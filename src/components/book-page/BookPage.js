import React, { useEffect, useState } from "react";
import {
    Container,
    Row,
    Col,
    Image,
    Button,
    ButtonGroup,
    Form,
} from "react-bootstrap";
import { connect } from "react-redux";
import { increment, decrement, addToCart } from "../../state/actions";
import bps from "./BookPage.module.css";
import axios from "axios";

const BookPage = ({ match, addToCart }) => {
    const currency = new Intl.NumberFormat("en-US", {
        //number formatter for the currency
        style: "currency",
        currency: "CAD",
    });

    const { bid } = match.params; //gets the bid from the url

    const [book, setBook] = useState({}); //holds the book object

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
            alert("Error The quanity you selected is 0, please select a value greater than or equal to 1")
            return
        }

        prompt("hello")

        addToCart({
            ...book,
            qty: quantity
        })

    }

    useEffect(() => {
        //used for "page side effects"
        const data = JSON.stringify({
            //sets up the bid for the body of the request as a JSON string "{"bid":"b001"}"
            bid: bid,
        });

        const config = {
            method: "post",
            url: "http://localhost:8080/EECS-4413-notAmazon/rest/books/getbook",
            headers: {
                "Content-Type": "application/json",
            },
            data: data,
        };

        axios(config) //sends a GET request from the book with the specific ID
            .then((res) => {
                setBook(res.data.book); //assigns the book object to the Book state
            })
            .catch((error) => {
                console.log(error);
            });
    }, [bid]);

    return (
        <div>
            <Container>
                <Row className={bps.container}>
                    <Col>
                        <Image
                            src="http://covers.openlibrary.org/b/isbn/9780385533225-L.jpg"
                            rounded
                        />
                    </Col>
                    <Col>
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
                        <Button className={bps.add_cart} onClick={handleAddToCart}>Add To Cart</Button>
                    </Col>
                </Row>
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
