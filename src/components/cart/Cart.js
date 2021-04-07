import React, { useState } from "react";
import cs from "./Cart.module.css";
import { connect } from "react-redux";
import {
    increment,
    decrement,
    addToCart,
    quantityAdd,
    quantitySub,
} from "../../state/actions";
import { useHistory } from 'react-router-dom'
import { Table, Button } from "react-bootstrap";
import PaymentForm from "../payment-form/PaymentForm";
import axios from 'axios';

const Cart = ({ cart, quantityAdd, quantitySub, total, user}) => { //place holder for actual login

    const history = useHistory()

    const [loggedIn , setLoggedIn] = useState(false);

    const [checkout, setCheckout] = useState(false);

    const itemList = cart.map((item) => (
        <tr key={item.bid}>
            <td>
                <img alt="book" src={item.image}></img>
            </td>
            <td>{item.title}</td>
            <td>{item.category}</td>
            <td> ${(Math.round(item.price * 100) / 100).toFixed(2)}</td>
            <td>
                {item.quantity}{" "}
                <Button variant="light" onClick={() => quantityAdd(item.bid)}>
                    +
                </Button>
                <Button variant="light" onClick={() => quantitySub(item.bid)}>
                    -
                </Button>
            </td>
            <td>
                $
                {(Math.round(item.price * item.quantity * 100) / 100).toFixed(
                    2
                )}
            </td>
        </tr>
    ));

    const totalCost = (
        <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td>
                <b>Total</b>
            </td>
            <td>${(Math.round(total * 100) / 100).toFixed(2)}</td>
        </tr>
    );

    const handleCheckout = () => {
        //on checkout, the button clicked state is set to true, and the users current token is passed into the REST api to be authenticated
        setCheckout(true)

        var config = {
            method: 'get',
            url: 'https://eecs-4413-notamazon.mybluemix.net/rest/auth/secret',
            headers: { 
              'Authorization': `Bearer ${user.token}`
            }
          };
          
          axios(config)
          .then((response) => { //if the reponse comes back as 200, the token is then authenticated and the user has been validated as logged in
            setLoggedIn(true)
          })
          .catch((error) => { //if the token is not authenticated then the user is promoteed a message and redirected to login
            console.log(error);
            alert("Oops, looks like you are not logged in")
            history.push('/login')
          });

    }

    return (
        <>
        {/* if the user is logged in and the user clicks the checkout button, the payment form pops up, other wise display the cart */}
            {checkout && loggedIn ? (
                <PaymentForm />
            ) : (
                <div className={cs.cart}>
                    <h2>Welcome to the Cart page</h2>
                    <Table responsive>
                        <thead>
                            <tr>
                                <th>Product</th>
                                <th>Title</th>
                                <th>Category</th>
                                <th>Price</th>
                                <th>Quantity</th>
                                <th>Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {itemList}
                            {totalCost}
                        </tbody>
                    </Table>

                    <Button onClick={() => handleCheckout()}>CheckOut</Button>
                </div>
            )}
        </>
    );
};

const mapStateToProps = (state) => {
    //takes the values from the cart
    return {
        count: state.count,
        cart: state.cart,
        total: state.total,
        user: state.user
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        increment: () => dispatch(increment()),
        decrement: () => dispatch(decrement()),
        addToCart: (item) => dispatch(addToCart(item)),
        quantityAdd: (id) => dispatch(quantityAdd(id)),
        quantitySub: (id) => dispatch(quantitySub(id)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
