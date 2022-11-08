
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

  export const LIBRARY_ADDRESS = "0x6a7667E68A8A02Af2aCD543F384F4a99F36D8018"