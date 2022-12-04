
  export interface Networks {
    [key: number]: string;
  }
  export const walletConnectSupportedNetworks: Networks = {
    // Add your network rpc URL here
    1: "https://ethereumnode.defiterm.io",
    3: "https://ethereumnode.defiterm-dev.net",
    31337: "http://127.0.0.1:8545/"
  };

  // Network chain ids
  export const supportedMetamaskNetworks = [1, 3, 4, 5, 42, 31337]

  //Hardhat node

  export const GOERLI_TOKEN = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
  export const MUMBAI_TOKEN ="0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";
  export const GOERLI_BRIDGE ="0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0";
  export const MUMBAI_BRIDGE ="0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9";
  
