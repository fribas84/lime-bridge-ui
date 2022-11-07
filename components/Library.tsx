import type { Web3Provider } from "@ethersproject/providers";
import { useWeb3React } from "@web3-react/core";
import { useEffect, useState } from "react";
import useLibraryContract from "../hooks/useLibraryContract";
import Table from 'react-bootstrap/Table';
import { Button, Form, Modal } from "react-bootstrap";
import Borrowed from "./Borrowed";
import NewBook from "./NewBook";
import {ethers} from 'ethers'
import ErrorHandler from "./ErrorHandler";
import LoaderTransaction from "./LoaderTransaction";


 
type LibraryContract = {
    contractAddress: string;
}

const Library = ({contractAddress}: LibraryContract) => {
    const usLibraryContract = useLibraryContract(contractAddress);
    const { account, library } = useWeb3React<Web3Provider>();
    const [borrowed, setBorrowed]  = useState<string>("");
    const [books, setBooks] = useState<string[]>();
    const [showNewBookModal, setNewBookModal]= useState<boolean>(false);
    const [showLoaderModal, setShowLoaderModal] = useState<boolean>(false);
    const [txHash,setTxHash] = useState<string>();
    const [errorMsg,setErrorMsg] = useState<string>();
    const [showErrorHandler, setShowErrorHandler] = useState<boolean>(false);

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
    
    const handleCleanErrors= () => {
        setShowErrorHandler(false);
        setErrorMsg("");
      }
    
    const errorTrigger = (msg:string) =>{
        setShowErrorHandler(true);
        setErrorMsg(msg);
    }
    const handleNewBook = async (isbn:number,qty:number) =>{
        let isbnHex = ethers.BigNumber.from(isbn).toHexString()
        isbnHex = ethers.utils.hexZeroPad(isbnHex,6);

        try {
            debugger;
            const tx = await usLibraryContract.addBook(isbnHex,qty);
            setTxHash(tx.hash);
            setShowLoaderModal(true);
            const txReceipt = await tx.wait();
            setShowLoaderModal(false);
          }
          catch(err){
            if(err.message){
                errorTrigger(err.message);
            }
            if(err.data.message){
                errorTrigger(err.data.message)
            }
            else{
                errorTrigger(err);
            }
          }
    }

    return(
        <div>
            <ErrorHandler showErrorHandler={showErrorHandler} errorMsg={errorMsg} handleCleanErrors={handleCleanErrors}/>
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

            <NewBook showNewBookModal={showNewBookModal} handleNewBookModal={handleNewBookModal} handleNewBook={handleNewBook} /> 
            <LoaderTransaction showLoaderModal={showLoaderModal} txHash={txHash}/>


  
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