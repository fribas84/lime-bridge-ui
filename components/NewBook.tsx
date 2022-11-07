import React from 'react'
import { useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import ErrorHandler from './ErrorHandler';

type NewBookProps ={
    showNewBookModal:boolean;
    handleNewBookModal: ()=>void;
    handleNewBook: (isbn:number,qty:number)=>void;
}

const NewBook=({showNewBookModal,handleNewBookModal,handleNewBook}:NewBookProps)=> {
    const [isbn,setIsbn] = useState<number>();
    const [qty,setQty] = useState<number>();
    const [errorMsg,setErrorMsg] = useState<string>();
    const [showErrorHandler, setShowErrorHandler] = useState<boolean>(false);

    const handleCleanErrors= () => {
        setShowErrorHandler(false);
        setErrorMsg("");
      }
    
    const errorTrigger = (msg:string) =>{
        setShowErrorHandler(true);
        setErrorMsg(msg);
    }
    const handleSaveBook = () => {
        const isbnString: string = String(isbn);
        console.log(isbnString.length)
        if(isbnString.length == 10 ||isbnString.length == 13)
        {
            if(qty>0){
                handleNewBookModal();
                handleNewBook(isbn,qty);
                }
            else{
                errorTrigger("Book quantity must be > 0.");
            }
            
           }
        else{
            errorTrigger("ISBN Length must be 10 or 13 characters.")
        }
    }

    const isbnInput = (input) => {
        setIsbn(input.target.value);
    }

    const qtyInput = (input) => {
        setQty(input.target.value);
    }
    return (

        <Modal show={showNewBookModal} onHide={handleNewBookModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Add new book</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label htmlFor="isbn" >ISBN:</Form.Label>
                            <Form.Control type="number" min="0" onChange={isbnInput} id="isbn" placeholder="Enter book ISBN..." />
                            <Form.Text className="text-muted">
                                10 and 13 ISBN Digits are supported.
                            </Form.Text>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label htmlFor="stock">Stock:</Form.Label>
                            <Form.Control id="stock" onChange={qtyInput}  type ="number" min="0"/>
                        </Form.Group>
                    </Form>    
                </Modal.Body>
                < Modal.Footer>
                    <Button variant="secondary" onClick={handleNewBookModal}>
                            Close
                    </Button>
                    <Button variant="primary" onClick={handleSaveBook}>
                            Save Changes
                    </Button>
                </Modal.Footer>
            <ErrorHandler showErrorHandler={showErrorHandler} errorMsg={errorMsg} handleCleanErrors={handleCleanErrors} />
        </Modal>
    ) 
}   

export default NewBook;