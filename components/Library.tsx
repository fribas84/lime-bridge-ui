import type { Web3Provider } from "@ethersproject/providers";
import { useWeb3React } from "@web3-react/core";
import { useEffect, useState } from "react";
import useLibraryContract from "../hooks/useLibraryContract";
import Table from 'react-bootstrap/Table';
import { Button, Form, Modal } from "react-bootstrap";
import Borrowed from "./Borrowed";
import NewBook from "./NewBook";
import {ethers} from 'ethers'


 
type LibraryContract = {
    contractAddress: string;
}

const Library = ({contractAddress}: LibraryContract) => {
    const usLibraryContract = useLibraryContract(contractAddress);
    const { account, library } = useWeb3React<Web3Provider>();
    const [borrowed, setBorrowed]  = useState<string>("");
    const [books, setBooks] = useState<string[]>();
    const [showNewBookModal, setNewBookModal]= useState<boolean>(false);
    useEffect(()=>{

    },[])

    const handleNewBookModal = () =>{ 
        if(showNewBookModal==false){
            setNewBookModal(true);
        }
        else{
            setNewBookModal(false);
        }
    }   
    
    const handleNewBook = async (isbn,qty) =>{
        const isbnHex = ethers.utils.hexZeroPad(ethers.utils.hexlify(isbn),6);

    
        try {
            const tx = await usLibraryContract.addBook(isbnHex,qty);
            setTxHash(tx.hash);
            setLoaderVisible(true);
            const txReceipt = await tx.wait();
            setLoaderVisible(false);
            resetForm();
            updateData();
          }
          catch(err){
            if(err.message){
              setErrorMessage(err.message);
            }
            if(err.data.message){
              setErrorMessage(err.data.message)
            }
            else{
              setErrorMessage(err);
            }
            setShowError(true);
          }
    }

    return(
        <div>
            <div className="upperTable">
            <Borrowed borrowed={borrowed} />
            <div className="button-wrapper">
            <Button variant="success" onClick={handleNewBookModal}>New Book</Button>
            </div>
            </div>
            
            <Table striped bordered hover>
                <thead>
                    <tr>
                    <th>ISBN</th>
                    <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                    <td>1</td>
                    <td>Mark</td>
                    </tr>
                </tbody>
            </Table>

            <NewBook showNewBookModal={showNewBookModal} handleNewBookModal={handleNewBookModal} />


  
            <style jsx>{`
        .results-form {
          display: flex;
          flex-direction: column;
        }

        .button-wrapper {
          margin: 20px;
          float: right;
        }
        .bookRentWrapper {
            float:left;
        }
        .upperTable {
            position:inline;
        }
        
      `}</style>
        </div>
    );

};

export default Library;