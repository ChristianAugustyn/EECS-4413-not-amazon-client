import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { connect } from "react-redux";
import { login } from "../../state/actions";
import { Redirect, useHistory } from "react-router-dom";
import axios from "axios";
import ls from "./Login.module.css";
import { isEmpty } from "lodash-es";

const Login = ({ login, location }) => {
    console.log(location);

    const history = useHistory();

    const [state, setState] = useState({
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        const { id, value } = e.target;
        setState({
            ...state,
            [id]: value,
        });
    };

    const onSubmit = (e) => {
        e.preventDefault();
        let flag = false;
        let issue = "";
        Object.entries(state).forEach((input) => {
            if (isEmpty(input[1])) {
                flag = true;
                issue = input[0];
            }
        });

        if (flag) {
            alert(`Oops, looks like you didnt fill in "${issue}" properly`); //placeholder for axios call
            return; //breaks out of the function
        }

        var config = {
            method: "post",
            url: "https://eecs-4413-notamazon.mybluemix.net/rest/auth/login",
            headers: {
                "Content-Type": "application/json",
            },
            data: JSON.stringify({
                username: state.email,
                password: state.password,
            }),
        };

        axios(config)
            .then((response) => {
                login(response.data.token);
                if (!!location.state.redirect) {
                    //if there exists a KV pair called redirect inside state then use it as the path
                    history.push(location.state.redirect);
                } else {
                    history.push("/");
                }
            })
            .catch((error) => {
                alert(
                    "Oops, looks like your username or password was incorrect, please try again"
                );
            });
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
                        id="email"
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
                        id="password"
                        placeholder="Password"
                        onChange={handleChange}
                    />
                </Form.Group>
                <div
                    style={{ color: "blue", cursor: "pointer" }}
                    onClick={() => {
                        if (!!location.state.redirect) {
                            //if there exists a KV pair called redirect inside state then use it as the path
                            history.push({
                                pathname: "/register",
                                state: { redirect: location.state.redirect },
                            });
                        } else {
                            history.push("/register");
                        }
                    }}
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
        user: state.user,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        login: (token) => dispatch(login(token)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
