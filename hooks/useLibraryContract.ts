import LIBRARY_ABI from "../contracts/LibraryV2.json";
import type { LibraryV2 } from "../contracts/types";
import useContract from "./useContract";

export default function useLibraryContract(contractAddress?: string) {
  return useContract<LibraryV2>(contractAddress, LIBRARY_ABI);
}
