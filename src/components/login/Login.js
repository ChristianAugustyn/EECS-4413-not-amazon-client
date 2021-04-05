import React from 'react';
import { Form, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { login } from '../../state/actions';
import './Login.css';

class Login extends React.Component {
  state = { email: '', password: '' };

  onSubmit = (e) => {
    e.preventDefault();
    let { email, password } = this.state;
    this.props.login(email, password);
  };

  render() {
    let { email, password } = this.state;

    return (
      <div className="login-form">
        <h1> Login</h1>
        <Form onSubmit={this.onSubmit}>
          <Form.Group controlId="formBasicEmail">
            <div className="label">
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
            <div className="label">
              {' '}
              <Form.Label>Password</Form.Label>
            </div>

            <Form.Control
              type="password"
              placeholder="Password"
              onChange={(e) => this.setState({ password: e.target.value })}
            />
          </Form.Group>

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
    isLoginPending: state.isLoginPending,
    isLoginSuccess: state.isLoginSuccess,
    loginError: state.loginError
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    login: (email, password) => dispatch(login(email, password))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
