import React from 'react';
import { Form, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { login } from '../../state/actions';
import { Redirect } from 'react-router-dom';
import ls from './Login.module.css';

class Login extends React.Component {
  state = { email: '', password: '', redirect: null };

  onSubmit = (e) => {
    e.preventDefault();
    alert('you have logged in'); //placeholder for axios call
  };

  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />;
    }
    return (
      <div className={ls.login_form}>
        <h1> Login</h1>
        <Form onSubmit={this.onSubmit}>
          <Form.Group controlId="formBasicEmail">
            <div className={ls.label}>
              <Form.Label>Email address</Form.Label>
            </div>
            <Form.Control
              type="email"
              placeholder="Enter email"
              onChange={(e) => this.setState({ email: e.target.value })}
            />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <div className={ls.label}>
              {' '}
              <Form.Label>Password</Form.Label>
            </div>

            <Form.Control
              type="password"
              placeholder="Password"
              onChange={(e) => this.setState({ password: e.target.value })}
            />
          </Form.Group>
          <div
            style={{ color: 'blue', cursor: 'pointer' }}
            onClick={() => this.setState({ redirect: '/Register' })}
          >
            New Customer? Register Here
          </div>

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  //takes the values from the cart
  return {
    login: state.login
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    //login: (email, password) => dispatch(login(email, password))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
