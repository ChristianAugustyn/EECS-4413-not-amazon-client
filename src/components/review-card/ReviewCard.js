import React from "react";
import { Card } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import rcs from './ReviewCard.module.css'

const ReviewCard = ({ review }) => {

    return (
        <Card className={rcs.card_container}>
            <Card.Body bg='secondary'>
                <Card.Title>{review.rtitle}</Card.Title>
                <Card.Subtitle className={rcs.subtitle}>
                    {`${review.fname} ${review.lname}`}
                </Card.Subtitle>
                <Card.Subtitle className={rcs.subtitle}>
                    {
                        [...Array(5)].map((e, i) => {
                            if(i + 1 <= review.rating) {
                                return <FontAwesomeIcon icon={faStar} color="#fcba03"/>
                            } else {
                                return <FontAwesomeIcon icon={faStar}/>
                            }
                        })
                    }
                </Card.Subtitle>
                <Card.Text>
                    {review.message}
                </Card.Text>
            </Card.Body>
        </Card>
    );
};

export default ReviewCard;
