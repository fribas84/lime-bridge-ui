import TKN_ABI from "../contracts/LimeToken.json";
import type { LimeToken } from "../contracts/types";
import useContract from "./useContract";

export default function useToken1(TOKEN_ADDRESS?: string) {
  return useContract<LimeToken>(TOKEN_ADDRESS, TKN_ABI);
}
