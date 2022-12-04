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
import useTokenBalance from "../hooks/useTokenBalance";

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
 
  const [destNetwork, setDestNetwork] = useState<string>("Mumbai");
  const [availableTokens, setAvailableTokens] = useState<number>();
  const [tokensToTx, setTokensToTx] = useState<number>(0);
  const { data } = useTokenBalance(account, GOERLI_TOKEN);
  useEffect( () => {
    const fetchData = async () => {
      await handleGetAvailableTokens();
    }
    fetchData();
  }, []);
  
  const handleMax = () => {
    setTokensToTx(availableTokens);
  }

  const handleSelectNetwork = (e) =>{
    handleGetAvailableTokens();
    setTokensToTx(0);
    setDestNetwork(e);
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

  return (
    <div>
      <Container className="justify-content-md-center md">
      <Table>
        <tbody>
        <tr>
          <td>
          <span><strong>Selected Network: </strong>{destNetwork}</span>
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
        <Button variant="success"> Transfer</Button>
      </Container>

      <style jsx>{`
        
        .actionButton {
          padding: 10px;
          float:left;
        }
      
      `}</style>
    </div>
  );
};

export default Bridge;
