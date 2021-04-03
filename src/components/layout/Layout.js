import React, { useEffect, useState } from "react";
import {
    Navbar,
    Nav,
    NavDropdown,
    Form,
    FormControl,
    Button,
} from "react-bootstrap";
import axios from "axios";

const Layout = ({ children }) => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        var config = {
            method: "get",
            url:
                "http://localhost:8080/EECS-4413-notAmazon/rest/books/categories",
            headers: {},
        };

        axios(config)
            .then((response) => {
                setCategories(response.data.categories);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [categories]);

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
                                <NavDropdown.Item href={`/category/${category.toLowerCase()}`}>
                                    {category}
                                </NavDropdown.Item>
                            ))}
                        </NavDropdown>
                        <Nav.Link href="/cart">Cart</Nav.Link>
                    </Nav>
                    <Form inline>
                        <FormControl
                            type="text"
                            placeholder="Search"
                            className="mr-sm-2"
                        />
                        <Button variant="outline-success">Search</Button>
                    </Form>
                </Navbar.Collapse>
            </Navbar>
            {children}
        </>
    );
};

export default Layout;
