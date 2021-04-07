import React, { useState } from 'react';
import { Table, Form } from 'react-bootstrap';
import ar from './Analytics.module.css';
import { connect } from 'react-redux';

const Analytics = () => {
  const [state, setState] = useState({
    dateRange: ''
  });

  const topTenBooks = (
    //generate books w/ axio call
    <tr>
      <td>1</td>
      <td> Alice in Wonderland</td>
    </tr>
  );

  const numBooksSold = (
    //generate books w/ axio call
    <tr>
      <td>1</td>
      <td> January</td>
    </tr>
  );

  const anonReport = (
    //generate statistic w/ axio call
    <tr>
      <td>****</td>
      <td>ads asd </td>
      <td>$10 </td>
    </tr>
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState({
      ...state,
      [name]: value
    });
  };

  return (
    <div className={ar.table}>
      <br />
      <h2> Books sold each month </h2>
      <Form.Control
        as="select"
        placeholder="Select a Month"
        name="dateRange"
        onChange={handleChange}
      >
        <option>Select a Month</option>
        <option> January</option>
        <option> Feburary</option>
      </Form.Control>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th># of Books Sold</th>
            <th>Month</th>
          </tr>
        </thead>
        <tbody>{numBooksSold}</tbody>
      </Table>
      <br />
      <h2> Top 10 Books Sold</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Book Titles</th>
          </tr>
        </thead>
        <tbody>{topTenBooks}</tbody>
      </Table>
      <br />
      <h2> User Buying Statistic</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Username</th>
            <th>ZipCode</th>
            <th>Amount Spend</th>
          </tr>
        </thead>
        <tbody>{anonReport}</tbody>
      </Table>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default Analytics;
