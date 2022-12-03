import type { Web3Provider } from "@ethersproject/providers";
import { useWeb3React } from "@web3-react/core";
import { useEffect, useState } from "react";
import useToken from "../hooks/useToken";
import Table from 'react-bootstrap/Table';
import { Button, Form, Modal } from "react-bootstrap";
import Borrowed from "./Borrowed";
import NewBook from "./NewBook";
import {ethers} from 'ethers'
import ErrorHandler from "./ErrorHandler";
import LoaderTransaction from "./LoaderTransaction";


type TokenContract = {
    contractAddress: string;
    network: number;
}


const Balance = ({contractAddress}: TokenContract) => {
    const _useToken = useToken(contractAddress);
    const { account, library } = useWeb3React<Web3Provider>();
    const [balance, setBalance] = useState<string>("0");
    const [tknSymbol,setTknSymbol] = useState<string>();

    useEffect( ()=>{
        
        getBalance();
        getSymbol();
 
    },[])

    const getBalance = async () =>{
        const bal: string = ethers.utils.formatEther(await _useToken.balanceOf(account));
        console.log("Balance" + bal);
        setBalance(bal);
    }

    const getSymbol = async () =>{
        const symbol: string = await _useToken.symbol();
        setTknSymbol(symbol);
    }
    return(
        <div>
           <span><strong>Current Token Balance: </strong> {balance} {tknSymbol}</span>


                    
            <style jsx>{`
            .results-form {
            display: flex;
            flex-direction: column;
            }

            .button-wrapper {
                margin: 5px;
                float: right;
            }
            .bookRentWrapper {
                float:left;
            }
            .upperTable {
                position:inline;
            }
            .actionButton {
                margin:1px;
                padding:1px;
            }

            
            `}</style>
        </div>
    );

};

export default Balance;


