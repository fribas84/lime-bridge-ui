import { Provider, Web3Provider } from "@ethersproject/providers";
import { useWeb3React } from "@web3-react/core";
import { useEffect, useState } from "react";
import useToken from "../hooks/useToken";
import Table from "react-bootstrap/Table";
import { Button, Container, Dropdown, DropdownButton, Form, InputGroup, Row} from "react-bootstrap";
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



const Bridge = ({GOERLI_TOKEN,
                MUMBAI_TOKEN,
                GOERLI_BRIDGE,
                MUMBAI_BRIDGE,
              }: BridgeContract) => {
  const { account, library, chainId,} = useWeb3React<Web3Provider>();
  const useGoerliToken = useToken(GOERLI_TOKEN);
  const useMumbaiToken = useToken(MUMBAI_TOKEN);
  const useGoerliBridge = useBridge(GOERLI_BRIDGE);
  const useMumbaiBridge = useBridge(MUMBAI_BRIDGE);
  const [currentNetwork, setCurrentNetwork] = useState<string>();
  const [destNetwork, setDestNetwork] = useState<string>();
  const [availableTokens, setAvailableTokens] = useState<number>();
  const [tokensToTx, setTokensToTx] = useState<number>(0);
  const [showLoaderModal, setShowLoaderModal] = useState<boolean>(false);
  const [txHash,setTxHash] = useState<string>();
  const [showErrorHandler,setShowErrorHandler] = useState<boolean>(false);
  const [errorMsg,setErrorMsg] = useState<string>();
  const [enable,setEnable] = useState<boolean>(true); 
  const [scan,setScan] = useState<string>();
  



 

  useEffect( () => {
    const fetchData = async () => {
    await handleGetAvailableTokens();
    handleGetNetwork();

    }
    fetchData();
  }, [availableTokens,tokensToTx,destNetwork]);
  
  const handleMax = () => {
    setTokensToTx(availableTokens);
  }

  const switchNetwork = async () => {
    const mumbaiId = `0x${Number(80001).toString(16)}`;
    const goerliId = `0x${Number(5).toString(16)}`;
    const switchNet =  currentNetwork ===  "Mumbai" ? goerliId : mumbaiId;
    await window.ethereum.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: switchNet }],
    });
    window.location.reload();
  }

  const switchNetworkNoReload = async (chain:string) => {
    await window.ethereum.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: chain }],
    });
  }

  const handleSelectNetwork = async (e) =>{
    
    if(e!=destNetwork){
      setTokensToTx(0);
      await switchNetwork();
      await setDestNetwork(e);
      await handleGetAvailableTokens();
    }
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
    setEnable(false);
    const hashlock  = newHashLock();
    const allowTokens  = ethers.utils.parseEther(String(tokensToTx));
    const options = {value: ethers.utils.parseEther("0.00005")};
    const destinationNetwork = 0; 
    const originToken = destNetwork ===  "Mumbai" ? useGoerliToken : useMumbaiToken;
    const destinationToken = destNetwork ===  "Mumbai" ? useMumbaiToken: useGoerliToken;
    const originBridge = destNetwork ===  "Mumbai" ? useGoerliBridge: useMumbaiBridge;
    const mumbaiId = `0x${Number(80001).toString(16)}`;
    const goerliId = `0x${Number(5).toString(16)}`;
    const destinationBridge = destNetwork ===  "Mumbai" ? useMumbaiBridge: useGoerliBridge;
    const destChainID = destNetwork ===  "Mumbai" ?  mumbaiId: goerliId;
    const originChainID = destNetwork ===  "Mumbai" ?  goerliId: mumbaiId;
    let transferId;
    try{
      
      console.log("Approve");
      const approve = await originToken.approve(originBridge.address,allowTokens);
      setTxHash(approve.hash);
      setShowLoaderModal(true);
      await approve.wait();
      setShowLoaderModal(false);
      console.log("request tx");
      const newRequestTransaction = await originBridge.requestTransaction(allowTokens,
                                                                          destinationNetwork,
                                                                          hashlock.hash,
                                                                          options);
      setTxHash(newRequestTransaction.hash);
      setShowLoaderModal(true);
      const txReceipt = await newRequestTransaction.wait();
      const [newTransferBridgeRequest] = txReceipt.events.filter((el)=>{ return el.event == 'NewTransferBridgeRequest'});
      const [user,amount,destination,timelock,_hashlock,_transferId] = newTransferBridgeRequest.args;
      transferId = _transferId;
      setShowLoaderModal(false);
      await wait(5000);   
      console.log("switch");
      console.log("Before:" + chainId);
      await switchNetworkNoReload(destChainID);
      console.log("after:" + chainId);
      {
        try{
          const initDestinationTransfer = await destinationBridge.initDestinationTransfer(amount,
            timelock,
            destination,
            _hashlock,
            transferId,
            options);
  
          setTxHash(initDestinationTransfer.hash);
          console.log("init destination");
          setShowLoaderModal(true);
          const destTransferReceipt = await initDestinationTransfer.wait();
          const [initDestinationTransferResult] = destTransferReceipt.events.filter((el)=>{ return el.event == 'NewTransferAvailable'});
          console.log("wait for timelock");
          await wait(20000);
          console.log("withdraw");
          const withdrawRequest = await destinationBridge.withdraw(transferId);
          setShowLoaderModal(false);
          setTxHash(withdrawRequest.hash);
          setShowLoaderModal(true);
          await withdrawRequest.wait()
          setShowLoaderModal(false);
        }
        catch(err){
          const msg:string = "Error while processing bridge cross, performing a refund.";
          errorTrigger(msg);
          await switchNetworkNoReload(originChainID);
          const refund = await originBridge.requestRefund(transferId)
        }
      }
      

      console.log("Before:" + chainId);
      await switchNetworkNoReload(originChainID);
      console.log("after:" + chainId);

      console.log("commit tx");
      const commit = await originBridge.commitTransaction(transferId);
      setTxHash(commit.hash);
      setShowLoaderModal(true);
      const commitReceipt = await commit.wait();
      setShowLoaderModal(false);
      const [commitEvent] = commitReceipt.events.filter((el)=>{ return el.event == 'TransactionCommited'});
      const [commitedTransferId] = commitEvent.args;
    }
      catch(err){
       
        errorTrigger(err.message);
    }
    window.location.reload();
  }

  const handleGetNetwork = async () => {
    const network = chainId ===  5 ? "Goerli" : "Mumbai";
    const dest = chainId === 5 ? "Mumbai" : "Goerli";
    setCurrentNetwork(network);
    setDestNetwork(dest);
  }
    


  return (
    <div>
      <Container className="justify-content-md-center md">
      <Table>
        <tbody>
        <tr>
          <td>
          <span><strong>Current Network: </strong> {currentNetwork}  </span> {"  ---  "} 
          <span>  <strong>Selected Destination Network: </strong>{destNetwork}</span>
          </td>
          <td>
            <DropdownButton
              title="Change Network destination"
              onSelect={handleSelectNetwork}
              disabled={!enable}
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
          
          <Form.Control type="number"  min={0} max={availableTokens} aria-label="Tokens to Transfer" value={tokensToTx} onChange={handleChangeTokensToTx} disabled={!enable}/>
          <Button variant="outline-secondary" id="button-addon2" onClick={handleMax} disabled={!enable}>
          Max
        </Button>
          
        </InputGroup>
          </td>
        </tr>
    
        </tbody>
        
      </Table>
        <Button variant="danger"  onClick={handleClear} disabled={!enable}> Clear</Button>{" "}
        <Button variant="success" onClick={handleTransfer} disabled={!enable} > Transfer</Button>

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
