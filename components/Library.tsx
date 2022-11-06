import type { Web3Provider } from "@ethersproject/providers";
import { useWeb3React } from "@web3-react/core";
import { useEffect, useState } from "react";
import useLibraryContract from "../hooks/useLibraryContract";
import Table from 'react-bootstrap/Table';
import { Button, Form, Modal } from "react-bootstrap";
import Borrowed from "./Borrowed";
import NewBook from "./NewBook";


 
type LibraryContract = {
    contractAddress: string;
}

const Library = ({contractAddress}: LibraryContract) => {
    const useLibrauseLibraryContract = useLibraryContract(contractAddress);
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