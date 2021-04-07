import React, { useEffect, useState } from "react";
import { connect } from 'react-redux'
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import SearchBar from "../searchbar/SearchBar";
import { login, logout } from '../../state/actions'
import axios from "axios";

const Layout = ({ children, user, logout }) => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        var config = {
            method: "get",
            url:
                "https://eecs-4413-notamazon.mybluemix.net/rest/books/categories",
            headers: {},
        };

        axios(config)
            .then((response) => {
                setCategories(response.data.categories);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    console.log(!!user.token)

    return (
        <>
            <Navbar bg="light" expand="lg">
                <Navbar.Brand href="/">notAmazon</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link href="/">Home</Nav.Link>
                        <NavDropdown title="Categories" id="basic-nav-dropdown">
                            {categories.map((category) => (
                                <NavDropdown.Item
                                    href={`/category/${category.toLowerCase()}`}
                                >
                                    {category}
                                </NavDropdown.Item>
                            ))}
                        </NavDropdown>
                        <Nav.Link href="/cart">Cart</Nav.Link>
                    </Nav>
                    <Nav className="ml-auto">
                        {
                            !!user.token ? (<Nav.Link onClick={() => logout()}>Logout</Nav.Link>) :  (<Nav.Link href='/login'>Login</Nav.Link>)
                        }
                        <SearchBar />
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
            {children}
        </>
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
        logout: () => dispatch(logout())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
