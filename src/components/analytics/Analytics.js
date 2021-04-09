import React, { useState, useEffect } from 'react';
import { Table, Form, Spinner } from 'react-bootstrap';
import ar from './Analytics.module.css';
import axios from 'axios';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom'

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
];

const Analytics = ({ user, location }) => {

  const history = useHistory();

  const [state, setState] = useState({
    dateRange: ''
  });

  const [isLoading, setisLoading] = useState({
    topTenBook: true,
    numOfBooksSold: true,
    anonReport: true
  });

  const [numBooks, setnumBooks] = useState([]);
  const [books, setBooks] = useState([]);
  const [userSpentBooks, setuserSpentBooks] = useState([]);

  if (user.role !== 'admin') {
    history.replace('/')
  }

  useEffect(() => {
    // GET request using fetch inside useEffect React hook
    var axios = require('axios');

    var config = {
      method: 'get',
      url: 'https://eecs-4413-notamazon.mybluemix.net/rest/admin/topten',
      headers: {}
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        setBooks(response.data.topTenBooks);
        console.log(books);
        setisLoading({ topTenBook: false });
      })
      .catch(function (error) {
        console.log(error);
      });

    var config = {
      method: 'get',
      url: 'https://eecs-4413-notamazon.mybluemix.net/rest/admin/userspentzip',
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
  }, []);

  const topTenBooksList = books.slice(0, 10).map((book, i) => (
    //generate books w/ axio call
    <tr>
      <td>{i + 1}</td>
      <td>{book.title}</td>
    </tr>
  ));

  const numBooksSold = numBooks.map((book) => (
    //generate books w/ axio call
    <tr>
      <td>{book.title}</td>
      <td>{book.count}</td>
    </tr>
  ));

  const anonReport = userSpentBooks.slice(0, 20).map((USBook) => (
    //generate statistic w/ axio call
    <tr>
      <td>{USBook.userid}</td>
      <td>{USBook.zip}</td>
      <td>{USBook.total}</td>
    </tr>
  ));

  const handleBooksSoldChange = (e) => {
    const { name, value } = e.target;
    setState({
      [name]: value
    });

    var config = {
      method: 'post',
      url: 'https://eecs-4413-notamazon.mybluemix.net/rest/admin/bookssold',
      headers: {
        'Content-Type': 'application/json'
      },
      data: JSON.stringify({ year: 2021, month: value })
    };
    console.log(value);
    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        setnumBooks(response.data.booksSold);

        setisLoading({ numOfBooksSold: false });
        //console.log(isLoading.numOfBooksSold);
      })
      .catch(function (error) {
        console.log(error);
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
        onChange={handleBooksSoldChange}
      >
        <option value="0">Select a Month</option>
        <option value="1"> January 2021</option>
        <option value="2"> Feburary 2021</option>
        <option value="3"> March 2021</option>
        <option value="4"> April 2021</option>
        <option value="5"> May 2021</option>
        <option value="6"> June 2021</option>
        <option value="7"> July 2021</option>
        <option value="8"> August 2021</option>
        <option value="9"> September 2021</option>
        <option value="10"> October 2021</option>
        <option value="11"> November 2021</option>
        <option value="12"> December 2021</option>
      </Form.Control>
      <br />

      <div style={{ overflowY: 'scroll', height: '200px' }}>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th colSpan="3">
                {state.dateRange > 0
                  ? months[state.dateRange - 1]
                  : 'Select a Month'}
              </th>
            </tr>
            <tr>
              <th>Title</th>
              <th>Number of Books Sold</th>
            </tr>
          </thead>
          <tbody>
            {!isLoading.numBooksSold ? (
              numBooksSold
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
      </div>

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
  return {
    user: state.user
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Analytics);
