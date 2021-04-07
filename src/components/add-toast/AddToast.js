import React, {useState} from 'react'
import { Toast } from 'react-bootstrap'

const AddToast = ({book, setShow, show}) => {

    return (
        <Toast onClose={() => setShow(false)} show={show} delay={3000} autohide style={{
            position: 'fixed',
            top: 0,
            right: 0,
            margin: '20px',
            zIndex: 10
          }}>
          <Toast.Header>
            <strong className="mr-auto">Added to Cart</strong>
          </Toast.Header>
          <Toast.Body>Woohoo, {book.title} was added to your cart</Toast.Body>
        </Toast>
    )
}
export default AddToast