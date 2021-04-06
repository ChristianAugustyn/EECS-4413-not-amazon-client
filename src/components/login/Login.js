import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { connect } from "react-redux";
import { login } from "../../state/actions";
import { Redirect, useHistory } from "react-router-dom";
import ls from "./Login.module.css";

const Login = () => {

    const history = useHistory()

    const [state, setState] = useState({
        email: "",
        password: "",
        redirect: null,
    });

    const handleChange = (e) => {
        const { id, value } = e.target;
        setState({
            ...state,
            [id]: value
        });
    };

    const onSubmit = (e) => {
        e.preventDefault();
        alert(`you have logged in, ${state.email + " " + state.password}`); //placeholder for axios call
    };

    return (
        <div className={ls.login_form}>
            <h1> Login</h1>
            <Form onSubmit={onSubmit}>
                <Form.Group controlId="formBasicEmail">
                    <div className={ls.label}>
                        <Form.Label>Email address</Form.Label>
                    </div>
                    <Form.Control
                        type="email"
                        id='email'
                        placeholder="Enter email"
                        onChange={handleChange}
                    />
                    <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <div className={ls.label}>
                        {" "}
                        <Form.Label>Password</Form.Label>
                    </div>

                    <Form.Control
                        type="password"
                        id='password'
                        placeholder="Password"
                        onChange={handleChange}
                    />
                </Form.Group>
                <div
                    style={{ color: "blue", cursor: "pointer" }}
                    onClick={() => history.push('/register')}
                >
                    New Customer? Register Here
                </div>

                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </div>
    );
};

const mapStateToProps = (state) => {
    //takes the values from the cart
    return {
        login: state.login,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        //login: (email, password) => dispatch(login(email, password))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
