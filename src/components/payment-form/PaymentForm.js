import React, { useState, useEffect } from "react";
import { Form, Row, Col, Button, Table, Alert, Spinner } from "react-bootstrap";
import _, { first, isEmpty } from "lodash";
import { connect } from "react-redux";
import { useHistory } from 'react-router-dom'
import {
    increment,
    decrement,
    addToCart,
    quantityAdd,
    quantitySub,
    clearCart
} from "../../state/actions";
import axios from "axios";
import { mapFromInfo, mapToInfo } from "./mapInfo";
import ps from "./PaymentForm.module.css";

const initForm = {
    //initialized state for the form
    billing: {
        street: "",
        city: "",
        province: "",
        country: "",
        zip: "",
    },
    shipping: {
        street: "",
        city: "",
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
};

const PaymentForm = ({ cart, total, user, clearCart }) => {
    const history = useHistory()

    const currency = new Intl.NumberFormat("en-US", {
        //number formatter for the currency
        style: "currency",
        currency: "CAD",
    });
    //state that is used to is the client has selected in the shipping and billing address is the same
    const [checked, setChecked] = useState(false);
    //set state for the display payment status after order is sent
    const [orderApproved, setOrderApproved] = useState(null);
    //form state
    const [form, setForm] = useState(initForm);

    useEffect(() => {
        //get the clients shipping and billing info one form load
        axios({
            method: "post",
            url: "https://eecs-4413-notamazon.mybluemix.net/rest/order/getinfo",
            headers: {
                Authorization: `Bearer ${user.token}`,
                "Content-Type": "application/json",
            },
            data: JSON.stringify({
                token: user.token,
            }),
        })
            .then((res) => {
                setForm(mapFromInfo(res.data, form));
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    //takes the changes from the form and applies it to the state
    const handleChange = (e) => {
        const { id, value } = e.target;
        const [first_level, second_level] = id.split("."); //the ids are split based a delimitter "." the first half being the first level of the json, and the right is the child

        setForm({
            ...form,
            b_id: first_level === "billing" ? -1 : form.b_id,
            s_id: first_level === "shipping" ? -1 : form.s_id,
            [first_level]: {
                ...form[first_level],
                [second_level]: value,
            },
        });
        console.log(form);
    };

    const onOrder = () => {
        console.log(form);
        let flag = false;
        let issue = {};
        //itterates over the form state and check if any of the fields are empty
        Object.entries(form).forEach((first_level) => {
            if (["shipping", "billing", "payment"].includes(first_level[0])) {
                //bypassess non form items
                Object.entries(first_level[1]).forEach((second_level) => {
                    if (isEmpty(second_level[1])) {
                        flag = true;
                        issue = {
                            first: _.capitalize(first_level[0]),
                            second: _.capitalize(second_level[0]),
                        };
                    } else {
                    }
                });
            }
        });
        if (flag) {
            //if any of the fields are empty, identify which one
            alert(
                `Oops, looks like you didnt fill in "${issue.second}" under "${issue.first}". try again`
            );
        }
        //TODO: ADD AXIOS CALL FOR PAYMENT
        const mappedForm = mapToInfo(form, user.token, cart);
        console.log(mappedForm);
        axios({
            method: "post",
            url:
                "https://eecs-4413-notamazon.mybluemix.net/rest/order/checkout",
            headers: {
                Authorization: `Bearer ${user.token}`,
                "Content-Type": "application/json",
            },
            data: JSON.stringify(mappedForm),
        })
            .then((res) => {
                console.log(res); //SUCCESS
                setOrderApproved(true)
                clearCart()
                setTimeout(() => history.replace('/'), 3000)
            })
            .catch((err) => {
                console.log(err); //PAYMENT DIDNT WORK
                setOrderApproved(false)
                setTimeout(() => history.replace('/cart'), 3000)
            });
    };
    //if the check mark is checked, the that address from the billing gets trasnfered over to the shipping
    const handleCheck = () => {
        if (!checked) {
            setForm({
                ...form,
                shipping: form.billing,
            });
        } else {
            setForm({
                ...form,
                shipping: initForm.shipping,
            });
        }

        setChecked(!checked); //the checked state is altered to be the opposite of what it was
    };

    return (
        <div className={ps.payment_container}>
            <div
                style={
                    orderApproved !== null
                        ? {
                              display: "grid",

                              position: "fixed",
                              left: "0",
                              right: "0",
                              top: "0",
                              bottom: "0",
                              background: "rgba(0, 0, 0, 0.5)",
                              zIndex: "9",
                          }
                        : { display: "none" }
                }
            >
                <Alert
                    show={orderApproved == true}
                    variant="success"
                    style={{
                        position: "absolute",
                        zIndex: "10",
                        justifySelf: "center",
                        alignSelf: "center",
                    }}
                >
                    <Alert.Heading>
                        Order Successfully Completed!{" "}
                        <Spinner
                            animation="border"
                            variant="success"
                            style={{
                                display: "inline-block",
                                margin: "0 20px",
                            }}
                        />
                    </Alert.Heading>
                    <p>
                        Looks like your order went through successfully you will
                        recieve details about your order over email, we will
                        begin processing it soon. Thank you for ordering from
                        notAmazon
                    </p>
                    <hr />
                    <p className="mb-0">your will be redirect shortly</p>
                </Alert>
                <Alert
                    show={orderApproved == false}
                    variant="danger"
                    style={{
                        position: "absolute",
                        zIndex: "10",
                        height: "200px",
                        justifySelf: "center",
                        alignSelf: "center",
                    }}
                >
                    <Alert.Heading>
                        Credit Card Authorization Failed
                        <Spinner
                            animation="border"
                            variant="danger"
                            style={{
                                display: "inline-block",
                                margin: "0 20px",
                            }}
                        />
                    </Alert.Heading>
                    <p>
                        Oops, looks like something went went wrong when
                        authorizing your credit card, try again a couple
                        minutes.
                    </p>
                    <p>
                        make sure to look over your credit card credentials to
                        validate they are correct before pressing order!
                    </p>
                    <hr />
                    <p className="mb-0">your will be redirect shortly</p>
                </Alert>
            </div>
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
                                <td />
                                <td style={{ fontWeight: "bold" }}>
                                    {currency.format(total)}
                                </td>
                            </tr>
                        </tbody>
                    </Table>
                </Col>
                <Col>
                    <Form>
                        <h3>Billing Information</h3>
                        <Form.Row>
                            <Col>
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
                            </Col>
                            <Col>
                                <Form.Group>
                                    <Form.Label>City</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Toronto"
                                        id="billing.city"
                                        value={form.billing.city}
                                        onChange={handleChange}
                                    />
                                </Form.Group>
                            </Col>
                        </Form.Row>
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
                        <Form.Row>
                            <Col>
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
                            </Col>
                            <Col>
                                <Form.Group>
                                    <Form.Label>City</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Toronto"
                                        id="shipping.city"
                                        value={form.shipping.city}
                                        onChange={handleChange}
                                    />
                                </Form.Group>
                            </Col>
                        </Form.Row>
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
                        <Form.Check
                            type="checkbox"
                            label="billing address is the same as shipping"
                            checked={checked}
                            onChange={handleCheck}
                        />
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
                                        maxLength="16"
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
                                        maxLength="3"
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
        user: state.user,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        increment: () => dispatch(increment()),
        decrement: () => dispatch(decrement()),
        addToCart: (item) => dispatch(addToCart(item)),
        quantityAdd: (id) => dispatch(quantityAdd(id)),
        quantitySub: (id) => dispatch(quantitySub(id)),
        clearCart: () => dispatch(clearCart())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(PaymentForm);
