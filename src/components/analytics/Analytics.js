import React, { useState, useEffect } from 'react';
import { Table, Form, Spinner } from 'react-bootstrap';
import ar from './Analytics.module.css';
import axios from 'axios';
import { connect } from 'react-redux';

const Analytics = () => {
  const [state, setState] = useState({
    dateRange: ''
  });

  const [isLoading, setisLoading] = useState({
    topTenBook: true,
    numOfBooksSold: true,
    anonReport: true
  });
  const [books, setBooks] = useState([]);
  const [userSpentBooks, setuserSpentBooks] = useState([]);

  useEffect(() => {
    // GET request using fetch inside useEffect React hook
    var axios = require('axios');

    var config = {
      method: 'get',
      url: 'http://localhost:8080/EECS-4413-notAmazon/rest/admin/topten',
      headers: {}
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        setBooks(response.data.topTenBooks.reverse());
        console.log(books);
        setisLoading({ topTenBook: false });
      })
      .catch(function (error) {
        console.log(error);
      });

    var config = {
      method: 'get',
      url: 'http://localhost:8080/EECS-4413-notAmazon/rest/admin/userspentzip',
      headers: {}
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        setuserSpentBooks(response.data.userSpentZip);
        setisLoading({ anonReport: false });
      })
      .catch(function (error) {
        console.log(error);
      });

    // empty dependency array means this effect will only run once (like componentDidMount in classes)
  }, []);

  // topTenBooks.map((book) =>
  const topTenBooksList = books.slice(0, 10).map((book) => (
    //generate books w/ axio call
    <tr>
      <td>{book.count}</td>
      <td>{book.title}</td>
    </tr>
  ));

  // Update the document title using the browser API    document.title = `You clicked ${c

  const numBooksSold = (
    //generate books w/ axio call
    <tr>
      <td>1</td>
      <td> January</td>
    </tr>
  );

  const anonReport = userSpentBooks.slice(0, 10).map((USBook) => (
    //generate statistic w/ axio call
    <tr>
      <td>{USBook.userid}</td>
      <td>{USBook.zip}</td>
      <td>{USBook.total}</td>
    </tr>
  ));

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
      <br />
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
        <tbody>
          {!isLoading.topTenBook ? (
            topTenBooksList
          ) : (
            <tr>
              <td colSpan="2">
                <Spinner animation="border" role="status">
                  <span colSpan="5" className="sr-only">
                    Loading...
                  </span>
                </Spinner>
              </td>
            </tr>
          )}
        </tbody>
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
        <tbody>
          {!isLoading.anonReport ? (
            anonReport
          ) : (
            <tr>
              <td colSpan="3">
                <Spinner animation="border" role="status">
                  <span colSpan="5" className="sr-only">
                    Loading...
                  </span>
                </Spinner>
              </td>
            </tr>
          )}
        </tbody>
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
