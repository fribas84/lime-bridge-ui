import React, { useState } from 'react'
import { Modal,Button } from 'react-bootstrap';
import ErrorHandler from './ErrorHandler';

type BorrowedProps = {
    cannotBorrow:boolean
    book:number;
    handleBorrow:(number)=>void;
    getHistory:(number)=>string[];
}

function Book({cannotBorrow,book,handleBorrow,getHistory}:BorrowedProps) {
    const [showHistory,setShowHistory] = useState<boolean>(false);
    const [bookHistory,setBookHistory] = useState<string[]>();
    const handleHistory = async () =>{
        if(!showHistory)
        {
            setBookHistory(await getHistory(book));
            setShowHistory(true);

        }
        else{
            setShowHistory(false);
        }
    }
  
    return (
        <>
        
     
        <td> 
        <Button className="actionButton" disabled={cannotBorrow} variant="success" onClick={()=>handleBorrow(book)}> Borrow </Button>
        {' '}
        <Button onClick={()=>handleHistory()}  variant="info">Show History</Button>
        </td>

        
            <Modal show={showHistory} onHide={handleHistory}>
                    <Modal.Header closeButton>
                        <Modal.Title>Book Borrow History: {book}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {bookHistory?.map(addr =>{
                            return(
                                <p key={Math.floor(Math.random()*book)}>{addr}</p>
                            )
                        })}    
                    </Modal.Body>
                    < Modal.Footer>
                        <Button variant="secondary" onClick={handleHistory}>
                                Close
                        </Button>
                    </Modal.Footer>
                
            </Modal>
       
            
          </>  
        
    
  )
}

export default Book