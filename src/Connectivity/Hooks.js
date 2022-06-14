import React from "react";
import { Contract } from "@ethersproject/contracts";
import AvaxAbi from "./AvaxAbi.json";
import AvaxPriceAbi from "./AvaxPriceAbi.json";
import { AvaxAddress, AvaxPriceAddress } from "./Environment";
import { ethers } from "ethers";
let walletAddress = "0x8ba1f109551bD432803012645Ac136ddd64DBA72";

const provider = new ethers.providers.JsonRpcProvider(
  "https://api.avax.network/ext/bc/C/rpc"
);
// const address = "0xC9E60AFdf83f082f5bFFb649d207707FE8182cce";
// const data = provider.getCode(address);
// console.log(data);
export const voidAccount = new ethers.VoidSigner(walletAddress, provider);
function useContract(address, ABI, signer) {
  return React.useMemo(() => {
    if (signer) {
      return new Contract(address, ABI, signer);
    } else {
      return new Contract(address, ABI, voidAccount);
    }
  }, [address, ABI, signer]);
}

export function useAvaxContract(signer) {
  return useContract(AvaxAddress, AvaxAbi, signer);
}
export function useAvaxPriceContract(signer) {
  return useContract(AvaxPriceAddress, AvaxPriceAbi, signer);
}
