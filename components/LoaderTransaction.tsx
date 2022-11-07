import { FallingLines } from  'react-loader-spinner';
import { Button, Modal } from 'react-bootstrap';


type LoaderTransactionProps ={
    showLoaderModal: boolean;
    txHash: string
}

const LoaderTransaction = ({showLoaderModal, txHash}: LoaderTransactionProps) =>{
    return(
        <div hidden={!showLoaderModal}>
            <FallingLines
                color="#4fa94d"
                width="100"
                visible={showLoaderModal}  
            />
            <p>Trasaction hash: {txHash}</p>
            <p><a href={"https://goerli.etherscan.io/tx/" + txHash} target="_blank" rel="noopener noreferrer">
                Click to view transaction in Etherscan</a></p>
        </div>

    );

};

export default LoaderTransaction;