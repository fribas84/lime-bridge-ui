import type { Web3Provider } from "@ethersproject/providers";
import { useWeb3React } from "@web3-react/core";
import { useEffect, useState } from "react";
import useToken from "../hooks/useToken";
import Table from "react-bootstrap/Table";
import { Button, Container, Dropdown, DropdownButton, Form, InputGroup, Row} from "react-bootstrap";
import Borrowed from "./Borrowed";
import NewBook from "./NewBook";
import { ethers } from "ethers";
import ErrorHandler from "./ErrorHandler";
import LoaderTransaction from "./LoaderTransaction";
import useBridge from "../hooks/useBridge";
const crypto = require('crypto')


type BridgeContract = {
  GOERLI_TOKEN: string;
  MUMBAI_TOKEN: string;
  GOERLI_BRIDGE: string;
  MUMBAI_BRIDGE: string;
}



const Bridge = ({GOERLI_TOKEN,MUMBAI_TOKEN,GOERLI_BRIDGE,MUMBAI_BRIDGE}: BridgeContract) => {
  const { account, library } = useWeb3React<Web3Provider>();
  const useGoerliToken = useToken(GOERLI_TOKEN);
  const useMumbaiToken = useToken(MUMBAI_TOKEN);
  const useGoerliBridge = useBridge(GOERLI_BRIDGE);
  const useMumbaiBridge = useBridge(MUMBAI_BRIDGE);

  const [destNetwork, setDestNetwork] = useState<string>("Mumbai");
  const [availableTokens, setAvailableTokens] = useState<number>();
  const [tokensToTx, setTokensToTx] = useState<number>(0);
  const [showLoaderModal, setShowLoaderModal] = useState<boolean>(false);
  const [txHash,setTxHash] = useState<string>();
  const [showErrorHandler,setShowErrorHandler] = useState<boolean>(false);
  const [errorMsg,setErrorMsg] = useState<string>();

  useEffect( () => {
    const fetchData = async () => {
    await handleGetAvailableTokens();

    }
    fetchData();
  }, [availableTokens,tokensToTx,destNetwork]);
  
  const handleMax = () => {
    setTokensToTx(availableTokens);
  }

  const handleSelectNetwork = async (e) =>{
    setTokensToTx(0);
    setDestNetwork(e);
    handleGetAvailableTokens();
    ;
  }

  const handleGetAvailableTokens = async () =>{
    if(destNetwork == "Mumbai"){
      const bal = await useGoerliToken.balanceOf(account);
      setAvailableTokens(Number(ethers.utils.formatEther(bal)));
    }
    if(destNetwork == "Goerli"){
      const bal = await useMumbaiToken.balanceOf(account);
      setAvailableTokens(Number(ethers.utils.formatEther(bal)));
    }
  } 
  
  const handleChangeTokensToTx = (e) =>{
  setTokensToTx(e.target.value);
  }

  const handleClear = () =>{
    setDestNetwork("Mumbai");
    handleGetAvailableTokens();
    setTokensToTx(0);
  }

  const hexNormalizer = (data) => '0x' + data.toString('hex')
  const rand= () => crypto.randomBytes(32)
  
  const createHash =  (secret) => crypto.createHash('sha256').update(secret).digest();
  const newHashLock = () => { 
      const secret = rand()
      const hash = createHash(secret)
      return {
        secret: hexNormalizer(secret),
        hash: hexNormalizer(hash),
      }
    }
  const wait = (milliseconds) => {
      return new Promise(resolve => {
          setTimeout(resolve, milliseconds);
      });
    }
  const errorTrigger = (msg:string) =>{
      setShowErrorHandler(true);
      setErrorMsg(msg);
  }
  const handleCleanErrors= () => {
    setShowErrorHandler(false);
    setErrorMsg("");
  }

  const handleTransfer= async () => {
    const hashlock  = newHashLock();
    const allowTokens  = ethers.utils.parseEther(String(tokensToTx));
    
    const destinationNetwork = destNetwork ===  "Mumbai" ? 1:0;
    const originToken = destNetwork ===  "Mumbai" ? useGoerliToken : useMumbaiToken;
    const destinationToken = destNetwork ===  "Mumbai" ? useMumbaiToken: useGoerliToken;
    const originBridge = destNetwork ===  "Mumbai" ? useGoerliBridge: useMumbaiBridge;
    const destinationBridge = destNetwork ===  "Mumbai" ? useMumbaiBridge: useGoerliBridge;

    try{
      await originToken.approve(originBridge.address,allowTokens);
      const newRequestTransaction = await originBridge.requestTransaction(allowTokens,
                                                                          destinationNetwork,
                                                                          hashlock.hash);
      setTxHash(newRequestTransaction.hash);
      setShowLoaderModal(true);
      const txReceipt = await newRequestTransaction.wait();
      const [newTransferBridgeRequest] = txReceipt.events.filter((el)=>{ return el.event == 'NewTransferBridgeRequest'});
      const [user,amount,destination,timelock,_hashlock,transferId] = newTransferBridgeRequest.args;
      const initDestinationTransfer = await destinationBridge.initDestinationTransfer(amount,
                                                                                      timelock,
                                                                                      destination,
                                                                                      _hashlock,
                                                                                      transferId);
      setShowLoaderModal(false);
      setTxHash(initDestinationTransfer.hash);
      setShowLoaderModal(true);
      const txReceipt2 = await initDestinationTransfer.wait();
      const [initDestinationTransferResult] = txReceipt2.events.filter((el)=>{ return el.event == 'NewTransferAvailable'});
      await wait(20000);
      const withdrawRequest = await destinationBridge.withdraw(transferId);
      setShowLoaderModal(false);
      setTxHash(withdrawRequest.hash);
      setShowLoaderModal(true);
      await wait(5000);
      setShowLoaderModal(false);
    }
      catch(err){
        errorTrigger(err.message);
    }
    finally{
      await handleGetAvailableTokens();
    }
  }
    


  return (
    <div>
      <Container className="justify-content-md-center md">
      <Table>
        <tbody>
        <tr>
          <td>
          <span><strong>Selected Destination Network: </strong>{destNetwork}</span>
          </td>
          <td>
            <DropdownButton
              title="Change Network destination"
              onSelect={handleSelectNetwork}
            >
              <Dropdown.Item eventKey="Goerli">Goerli</Dropdown.Item>
              <Dropdown.Item eventKey="Mumbai">Mumbai</Dropdown.Item>
            </DropdownButton>
          </td>
        </tr>
        <tr>
          <td>
            Available tokens
          </td>
          <td>LMT {availableTokens}</td>
        </tr>
        <tr>
          <td colSpan={2}>
          <InputGroup className="mb-3">
          <InputGroup.Text>LMTs to Transfer:</InputGroup.Text>
          
          <Form.Control type="number" min={0} max={availableTokens} aria-label="Tokens to Transfer" value={tokensToTx} onChange={handleChangeTokensToTx}/>
          <Button variant="outline-secondary" id="button-addon2" onClick={handleMax}>
          Max
        </Button>
          
        </InputGroup>
          </td>
        </tr>
    
        </tbody>
        
      </Table>
        <Button variant="danger"  onClick={handleClear}> Clear</Button>{" "}
        <Button variant="success" onClick={handleTransfer}> Transfer</Button>

      </Container>

      <LoaderTransaction showLoaderModal={showLoaderModal} txHash={txHash}/>
      <ErrorHandler showErrorHandler={showErrorHandler} errorMsg={errorMsg} handleCleanErrors={handleCleanErrors}/>


      <style jsx>{`
        
        button {
          margin: 15px;
          
        }
      
      `}</style>
    </div>
  );
};

export default Bridge;
