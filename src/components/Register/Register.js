import React, { useState } from 'react';
import { isEmpty } from 'lodash-es';
import { Form, Button } from 'react-bootstrap';
import rs from './Register.module.css';

const Register = (props) => {
  const initForm = {
    email: '',
    password: '',
    b_fname: '',
    b_lname: '',
    b_address: '',
    b_city: '',
    b_country: '',
    b_stateprovince: '',
    b_zipcode: '',
    s_fname: '',
    s_lname: '',
    s_address: '',
    s_city: '',
    s_country: '',
    s_stateprovince: '',
    s_zipcode: ''
  };

  const [form, setForm] = useState(initForm);

  const handleChange = (event) => {
    const name = event.target.id;
    setForm({
      ...form,
      [name]: event.target.value
    });
    console.log(form);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    let flag = false;
    let issue = null;
    Object.entries(form).forEach((key, value) => {
      if (isEmpty(key[1])) {
        switch (key[0]) {
          case 'email':
            issue = 'Email';
            break;
          case 'password':
            issue = 'Password';
            break;
          case 'b_fname':
            issue = 'Billing first name';
            break;
          case 'b_lname':
            issue = 'Billing last name';
            break;
          case 'b_address':
            issue = 'Billing Address';
            break;
          case 'b_city':
            issue = 'Billing City';
            break;
          case 'b_country':
            issue = 'Billing Country';
            break;
          case 'b_zipcode':
            issue = 'Billing Zip Code';
            break;
          case 's_fname':
            issue = 'Shipping first name';
            break;
          case 's_lname':
            issue = 'Shipping last name';
            break;
          case 's_address':
            issue = 'Shipping Address';
            break;
          case 's_city':
            issue = 'Shipping City';
            break;
          case 's_country':
            issue = 'Shipping Country';
            break;
          case 's_zipcode':
            issue = 'Shipping Zip Code';
            break;

          default:
            break;
        }
        flag = true;
      }
    });

    if (flag) {
      alert(
        `Error: looks like you didn't fill in "${issue}", please try again`
      );
    } else {
      //add axios call here.
    }
  };

  return (
    <div className={rs.register_form}>
      <Form onSubmit={handleSubmit}>
        <h1> Register</h1>
        <Form.Group>
          <div className={rs.label}>
            <Form.Label>Email address</Form.Label>
          </div>
          <Form.Control
            type="email"
            placeholder="Enter email"
            id="email"
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group>
          <div className={rs.label}>
            <Form.Label>Password</Form.Label>
          </div>

          <Form.Control
            type="password"
            placeholder="Password"
            id="password"
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group>
          <div className={rs.label}>
            <Form.Label>Billing Address</Form.Label>
          </div>

          <Form.Control
            type="text"
            placeholder="First Name"
            id="b_fname"
            onChange={handleChange}
          />
          <Form.Control
            type="text"
            placeholder="Last Name"
            id="b_lname"
            onChange={handleChange}
          />
          <Form.Control
            type="text"
            placeholder="Address"
            id="b_address"
            onChange={handleChange}
          />
          <Form.Control
            type="text"
            placeholder="City"
            id="b_city"
            onChange={handleChange}
          />
          <Form.Control
            as="select"
            placeholder="Country"
            id="b_country"
            onChange={handleChange}
          >
            <option>Select a Country</option>
            <option> Canada</option>
            <option> United States of America</option>
          </Form.Control>
          <Form.Control
            type="text"
            placeholder="State/Province"
            id="b_stateprovince"
            onChange={handleChange}
          />
          <Form.Control
            type="text"
            placeholder="Zip/Postal Code"
            id="b_zipcode"
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group>
          <div className={rs.label}>
            <Form.Label>Shipping Address</Form.Label>
          </div>

          <Form.Control
            type="text"
            placeholder="First Name"
            id="s_fname"
            onChange={handleChange}
          />
          <Form.Control
            type="text"
            placeholder="Last Name"
            id="s_lname"
            onChange={handleChange}
          />
          <Form.Control
            type="text"
            placeholder="Address"
            id="s_address"
            onChange={handleChange}
          />
          <Form.Control
            type="text"
            placeholder="City"
            id="s_city"
            onChange={handleChange}
          />
          <Form.Control
            as="select"
            placeholder="Country"
            id="s_country"
            onChange={handleChange}
          >
            <option>Select a Country</option>
            <option> Canada</option>
            <option> United States of America</option>
          </Form.Control>
          <Form.Control
            type="text"
            placeholder="State/Province"
            id="s_stateprovince"
            onChange={handleChange}
          />
          <Form.Control
            type="text"
            placeholder="Zip/Postal Code"
            id="s_zipcode"
            onChange={handleChange}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default Register;
