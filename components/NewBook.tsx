import React from 'react'
import { Button, Form, Modal } from 'react-bootstrap';

type NewBookProps ={
    showNewBookModal:boolean;
    handleNewBookModal: ()=>void;
}

const NewBook=({showNewBookModal,handleNewBookModal}:NewBookProps)=> {

  return (

    <Modal show={showNewBookModal} onHide={handleNewBookModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Add new book</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label htmlFor="isbn" >ISBN:</Form.Label>
                            <Form.Control type="text" id="isbn" placeholder="Enter book ISBN..." />
                            <Form.Text className="text-muted">
                                10 and 13 ISBN Digits are supported.
                            </Form.Text>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label htmlFor="stock">Stock:</Form.Label>
                            <Form.Control id="stock" type ="number" min="0"/>
                        </Form.Group>
                    </Form>    
                </Modal.Body>
                < Modal.Footer>
                    <Button variant="secondary" onClick={handleNewBookModal}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleNewBookModal}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
    
  )
}

export default NewBook