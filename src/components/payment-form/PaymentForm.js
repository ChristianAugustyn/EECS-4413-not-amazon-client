import React, { useState } from 'react'
import { Form } from 'react-bootstrap'

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
            cvv: ""
        },
        cart: []
    })

    return (
        <div>
            <Form>
                
            </Form>
        </div>
    )
}

export default PaymentForm;