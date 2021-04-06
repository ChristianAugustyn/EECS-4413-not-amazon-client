import React, { useState } from "react";
import { Form, Row, Col, Button, Card, Table } from "react-bootstrap";
import _, { first, isEmpty } from "lodash";
import { connect } from "react-redux";
import {
    increment,
    decrement,
    addToCart,
    quantityAdd,
    quantitySub,
} from "../../state/actions";
import ps from "./PaymentForm.module.css";

const PaymentForm = ({ cart, total }) => {
    const currency = new Intl.NumberFormat("en-US", {
        //number formatter for the currency
        style: "currency",
        currency: "CAD",
    });

    const [form, setForm] = useState({
        billing: {
            street: "",
            province: "",
            country: "",
            zip: "",
        },
        shipping: {
            street: "",
            province: "",
            country: "",
            zip: "",
        },
        payment: {
            type: "",
            name: "",
            card: "",
            expirationDate: "",
            cvv: "",
        },
    });

    const handleChange = (e) => {
        const { id, value } = e.target;

        const [first_level, second_level] = id.split(".");

        setForm({
            ...form,
            [first_level]: {
                ...form[first_level],
                [second_level]: value,
            },
        });
        console.log(form);
    };

    const onOrder = () => {
        let flag = false;
        let issue = {};
        Object.entries(form).forEach((first_level) => {
            Object.entries(first_level[1]).forEach((second_level) => {
                if (isEmpty(second_level[1])) {
                    flag = true;
                    issue = {
                        first: _.capitalize(first_level[0]),
                        second: _.capitalize(second_level[0]),
                    };
                }
            });
        });
        if (flag)
            alert(
                `Oops, looks like you didnt fill in "${issue.second}" under "${issue.first}". try again`
            );
    };

    return (
        <div className={ps.payment_container}>
            <Row>
                <Col>
                    <h3>Cart</h3>
                    <Table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cart.map((item) => (
                                <tr>
                                    <td>{item.title}</td>
                                    <td>
                                        {currency.format(
                                            item.quantity * item.price
                                        )}
                                    </td>
                                </tr>
                            ))}
                            <tr>
                                <td/>
                                <td style={{fontWeight: 'bold'}}>{currency.format(total)}</td>
                            </tr>
                        </tbody>
                    </Table>
                </Col>
                <Col>
                    <Form>
                        <h3>Billing Information</h3>
                        <Form.Group>
                            <Form.Label>Street</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="123 Sesame St"
                                id="billing.street"
                                value={form.billing.street}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Row>
                            <Col>
                                <Form.Group>
                                    <Form.Label>Country</Form.Label>
                                    <Form.Control
                                        type="text"
                                        id="billing.country"
                                        value={form.billing.country}
                                        onChange={handleChange}
                                    />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group>
                                    <Form.Label>Province</Form.Label>
                                    <Form.Control
                                        type="text"
                                        id="billing.province"
                                        value={form.billing.province}
                                        onChange={handleChange}
                                    />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group>
                                    <Form.Label>Zip</Form.Label>
                                    <Form.Control
                                        type="text"
                                        id="billing.zip"
                                        value={form.billing.zip}
                                        onChange={handleChange}
                                    />
                                </Form.Group>
                            </Col>
                        </Form.Row>

                        <h3>Shipping Information</h3>
                        <Form.Group>
                            <Form.Label>Street</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="123 Sesame St"
                                id="shipping.street"
                                value={form.shipping.street}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Row>
                            <Col>
                                <Form.Group>
                                    <Form.Label>Country</Form.Label>
                                    <Form.Control
                                        type="text"
                                        id="shipping.country"
                                        value={form.shipping.country}
                                        onChange={handleChange}
                                    />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group>
                                    <Form.Label>Province</Form.Label>
                                    <Form.Control
                                        type="text"
                                        id="shipping.province"
                                        value={form.shipping.province}
                                        onChange={handleChange}
                                    />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group>
                                    <Form.Label>Zip</Form.Label>
                                    <Form.Control
                                        type="text"
                                        id="shipping.zip"
                                        value={form.shipping.zip}
                                        onChange={handleChange}
                                    />
                                </Form.Group>
                            </Col>
                        </Form.Row>
                    </Form>
                </Col>
            </Row>
            <Row>
                <Col>
                    <h3>Payment Information</h3>
                    <Form>
                        <Form.Group>
                            <Form.Label>Payment Type</Form.Label>
                            {["Credit Card", "Debit Card"].map((type) => (
                                <Form.Check
                                    id="payment.type"
                                    type="radio"
                                    label={type}
                                    value={type}
                                    checked={type === form.payment.type}
                                    onChange={handleChange}
                                />
                            ))}
                        </Form.Group>
                        <Form.Group>
                            <Form.Row>
                                <Col>
                                    <Form.Label>Name on card</Form.Label>
                                    <Form.Control
                                        type="text"
                                        id="payment.name"
                                        value={form.payment.name}
                                        onChange={handleChange}
                                    />
                                </Col>
                                <Col>
                                    <Form.Label>Credit card number</Form.Label>
                                    <Form.Control
                                        type="text"
                                        id="payment.card"
                                        value={form.payment.card}
                                        onChange={handleChange}
                                    />
                                </Col>
                            </Form.Row>
                            {/* <Form.Group> */}
                            <Form.Row>
                                <Col>
                                    <Form.Label>Expiration date</Form.Label>
                                    <Form.Control
                                        type="date"
                                        id="payment.expirationDate"
                                        value={form.payment.expirationDate}
                                        onChange={handleChange}
                                    />
                                </Col>
                                <Col>
                                    <Form.Label>CVV</Form.Label>
                                    <Form.Control
                                        type="password"
                                        id="payment.cvv"
                                        value={form.payment.cvv}
                                        onChange={handleChange}
                                    />
                                </Col>
                            </Form.Row>
                        </Form.Group>
                        <Button onClick={() => onOrder()}>Order Now</Button>

                        <Button variant="light">Edit Cart</Button>
                    </Form>
                </Col>
            </Row>
        </div>
    );
};

const mapStateToProps = (state) => {
    //takes the values from the cart
    return {
        count: state.count,
        cart: state.cart,
        total: state.total,
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

export default connect(mapStateToProps, mapDispatchToProps)(PaymentForm);
