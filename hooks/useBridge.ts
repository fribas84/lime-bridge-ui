import BRIDGE_ABI from "../contracts/Bridge.json";
import type { Bridge } from "../contracts/types";
import useContract from "./useContract";

export default function useBridge(Bridge_Address?: string) {
  return useContract<Bridge>(Bridge_Address, BRIDGE_ABI);
}
