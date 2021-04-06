import React, { useState } from "react";
import { Form } from "react-bootstrap";
import ps from './PaymentForm.module.css'

const PaymentForm = () => {
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
        cart: [],
    });

    return (
        <div className={ps.payment_container}>
            <Form>
                <h3>Billing Information</h3>
                <Form.Group>
                    <Form.Label>Street</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="123 Sesame St"
                        id="billing.street"
                        value={form.billing.street}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Country</Form.Label>
                    <Form.Control
                        type="text"
                        id="billing.country"
                        value={form.billing.country}
                    />
                    <Form.Label>Province</Form.Label>
                    <Form.Control
                        type="text"
                        id="billing.province"
                        value={form.billing.province}
                    />
                    <Form.Label>Zip</Form.Label>
                    <Form.Control
                        type="text"
                        id="billing.zip"
                        value={form.billing.country}
                    />
                </Form.Group>
                <h3>Shipping Information</h3>
                <Form.Group>
                    <Form.Label>Street</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="123 Sesame St"
                        id="payment.street"
                        value={form.payment.street}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Country</Form.Label>
                    <Form.Control
                        type="text"
                        id="payment.country"
                        value={form.payment.country}
                    />
                    <Form.Label>Province</Form.Label>
                    <Form.Control
                        type="text"
                        id="payment.province"
                        value={form.payment.province}
                    />
                    <Form.Label>Zip</Form.Label>
                    <Form.Control
                        type="text"
                        id="payment.zip"
                        value={form.payment.country}
                    />
                </Form.Group>
            </Form>
        </div>
    );
};

export default PaymentForm;
