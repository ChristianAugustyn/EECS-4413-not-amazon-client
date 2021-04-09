import React, { useState } from "react";
import { Card, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import images from "../../images";
import AddToast from '../add-toast/AddToast'
import { connect } from "react-redux";
import { addToCart } from "../../state/actions";
import bs from "./BookCard.module.css";

const BookCard = ({ book, addToCart, setShow }) => {
    const history = useHistory();

    const [showToast, setShowToast] = useState(false);

    const currency = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "CAD",
    });

    return (
        <>
            <AddToast book={book} setShow={setShowToast} show={showToast} />
            <Card className={bs.card_container}>
                <div className={bs.card_image_container}>
                    <Card.Img variant="top" src={book.cover} />
                </div>
                <Card.Body>
                    <Card.Title className={bs.title}>{book.title}</Card.Title>
                    <Card.Text>
                        <p className={bs.price}>
                            {currency.format(book.price)}
                        </p>
                        <p className={bs.category}>{book.category}</p>
                    </Card.Text>
                    <Button
                        onClick={() => {
                            addToCart({ ...book, quantity: 1 });
                            setShowToast(true);
                        }}
                    >
                        Add to Cart
                    </Button>
                    <Button
                        variant="light"
                        onClick={() => history.push(`/book/${book.bid}`)}
                    >
                        View Book
                    </Button>
                </Card.Body>
            </Card>
        </>
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
        addToCart: (item) => dispatch(addToCart(item)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookCard);
