import React from "react";
import { Card } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { fas, faStar } from '@fortawesome/free-solid-svg-icons'
import rcs from './ReviewCard.module.css'

const ReviewCard = ({ review }) => {

    const rating = 2;

    return (
        <Card>
            <Card.Body bg='secondary'>
                <Card.Title>Great Book, really loved it</Card.Title>
                <Card.Subtitle className={rcs.subtitle}>
                    Christian Augustyn
                </Card.Subtitle>
                <Card.Subtitle className={rcs.subtitle}>
                    {
                        [...Array(5)].map((e, i) => {
                            if(i + 1 <= rating) {
                                return <FontAwesomeIcon icon={faStar} color="#fcba03"/>
                            } else {
                                return <FontAwesomeIcon icon={faStar}/>
                            }
                        })
                    }
                </Card.Subtitle>
                <Card.Text>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                </Card.Text>
            </Card.Body>
        </Card>
    );
};

export default ReviewCard;
