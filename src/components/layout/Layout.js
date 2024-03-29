import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useLocation } from "react-router-dom";
import { Navbar, Nav, NavDropdown, Badge } from "react-bootstrap";
import SearchBar from "../searchbar/SearchBar";
import { login, logout } from "../../state/actions";
import axios from "axios";

const Layout = ({ children, user, logout, cart }) => {
    const location = useLocation();

    const [categories, setCategories] = useState([]);

    console.log(user.role)

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
    }, [cart]);

    return (
        <>
            <Navbar bg="light" expand="lg">
                <Navbar.Brand
                    href="/"
                    style={{ fontFamily: "'Pacifico', cursive" }}
                >
                    notAmazon
                </Navbar.Brand>
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
                        <Nav.Link href="/cart">
                            Cart{" "}
                            {cart.length > 0 ? (
                                <Badge variant="primary">{cart.length}</Badge>
                            ) : null}
                        </Nav.Link>
                        {
                            user.role === 'admin' ? (
                                <Nav.Link href='/analytics'>Analytics</Nav.Link>
                            ): null
                        }
                    </Nav>
                    <Nav className="ml-auto">
                        {location.pathname !== "/cart" ? (
                            !!user.token ? (
                                <Nav.Link onClick={() => logout()}>
                                    Logout
                                </Nav.Link>
                            ) : (
                                <Nav.Link href="/login">Login</Nav.Link>
                            )
                        ) : null}
                        <SearchBar />
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
            <div className="content">{children}</div>
            <footer className="footer">
                <p> Made with ❤️ by Ajeet, Christian, James and Samuel</p>
                <p className="copyright">
                    Copyright ⓒ {new Date().getFullYear()} notAmazon
                </p>
            </footer>
        </>
    );
};

const mapStateToProps = (state) => {
    //takes the values from the cart
    return {
        user: state.user,
        cart: state.cart,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        login: (token) => dispatch(login(token)),
        logout: () => dispatch(logout()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
