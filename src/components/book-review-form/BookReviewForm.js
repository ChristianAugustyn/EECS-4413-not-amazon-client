import { isEmpty } from "lodash-es";
import React, {useState } from "react";
import { Form, Button } from "react-bootstrap";
import axios from 'axios'

const BookReviewForm = ({ bid }) => {
    const initForm = {
        bid: bid,
        rtitle: "",
        fname: "",
        rating: 0,
        message: "",
    };

    const [form, setForm] = useState(initForm);

    const handleChange = (event) => {
        const { id, value } = event.target;
        setForm({
            ...form,
            [id]: value,
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault()
        let flag = false;
        let issue = null;
        Object.entries(form).forEach((key, value) => {
            if (isEmpty(key[1])) {
                switch (key[0]) {
                    case "rtitle":
                        issue = "Title";
                        break;
                    case "fname":
                        issue = "First Name";
                        break;
                    case "rating":
                        issue = "Rating";
                        break;
                    case "message":
                        issue = "Message";
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
            setForm(initForm)
            var config = {
                method: 'post',
                url: 'https://eecs-4413-notamazon.mybluemix.net/rest/reviews/addReview',
                headers: { 
                  'Content-Type': 'application/json'
                },
                data : JSON.stringify({
                    ...form,
                    lname: ""
                })
              };
              
              axios(config)
              .then((response) => {
                  //ADD SOME SORT OF SUCCESS MESSAGE
              })
              .catch((error) => {
                console.log(error);
              });
        }
    };

    return (
        <div>
            <Form>
                <Form.Group>
                    <Form.Label>Title</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="I loved this Book!"
                        id="rtitle"
                        value={form.rtitle}
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>First Name</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Joe"
                        id="fname"
                        value={form.fname}
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Rating</Form.Label>
                    <Form.Control
                        as="select"
                        id="rating"
                        onChange={handleChange}
                    >
                        <option value={0}>0 Stars</option>
                        <option value={1}>1 Star</option>
                        <option value={2}>2 Stars</option>
                        <option value={3}>3 Stars</option>
                        <option value={4}>4 Stars</option>
                        <option value={5}>5 Stars</option>
                    </Form.Control>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Message</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={3}
                        id="message"
                        value={form.message}
                        onChange={handleChange}
                    />
                </Form.Group>
                <Button onClick={handleSubmit}>Submit</Button>
            </Form>
        </div>
    );
};

export default BookReviewForm;
