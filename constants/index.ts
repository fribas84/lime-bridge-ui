
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
  export const supportedMetamaskNetworks = [1, 3, 4, 5, 42, 31337];

  export const US_ELECTION_ADDRESS = "0xA09fF4F39FD8553051ABf0188100b7C5A6dc5452";
  export const LIBRARY_ADDRESS = "0x5fbdb2315678afecb367f032d93f642f64180aa3"