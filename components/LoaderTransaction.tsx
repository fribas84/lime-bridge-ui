import { FallingLines } from  'react-loader-spinner';
import { Button, Modal } from 'react-bootstrap';


type LoaderTransactionProps ={
    showLoaderModal: boolean;
    txHash: string
    scan: string
}

const LoaderTransaction = ({showLoaderModal, txHash,scan}: LoaderTransactionProps) =>{
    const url = scan === "0x13881" ? "https://mumbai.polygonscan.com/tx/" : "https://goerli.etherscan.io/tx/"  ;
    const scanner = scan === "0x13881" ?  "Polygonscan" : "Etherscan"  ;
    return(
        <div hidden={!showLoaderModal}>
            <FallingLines
                color="#4fa94d"
                width="100"
                visible={showLoaderModal}  
            />
            <p>Trasaction hash: {txHash}</p>
            <p><a href={url + txHash} target="_blank" rel="noopener noreferrer">
                Click to view transaction in {scanner}</a></p>
        </div>

    );

};

export default LoaderTransaction;