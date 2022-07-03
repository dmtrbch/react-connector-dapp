import { useMemo } from 'react';
import {
  Contract,
  // ContractInterface
} from '@ethersproject/contracts';
import { AddressZero } from '@ethersproject/constants';
import { useWeb3React } from '@web3-react/core';

export function useContract(contractAddress, ABI) {
  if (contractAddress === AddressZero) {
    throw Error(`Invalid 'contractAddress' parameter '${contractAddress}'.`);
  }

  const { library, account } = useWeb3React();

  const signerOrProvider = account ? library.getSigner(account).connectUnchecked() : library;
  return useMemo(() => {
    return new Contract(contractAddress, ABI, signerOrProvider);
  }, [contractAddress, ABI, signerOrProvider]);
}

// this hook is the entry way into a smart contract, smart contract solidity world to javascript world

// the real magic is on line 19 where we are setting up a new contract instance

// the library for this class Contract comes from a project called ethers project

// there are two main library providers - web3 and ethers

// we are using ethers for this example, they are pretty much the same

// you pass in the library you want to use

// lets go to app.js to show how that works

// po vtor pat se vrakjame

// on line 14 we actually get that ethers library

// if we only want to read contarct from the blockchain we it means we do not sign transactions

// but if we want to interact with the contract we would have to sign a transactions

// on line 16 we are setting up the signer using the library through web3 react

// and the signer can be used to instaniate the contract instance

// znam deka e mnogu informacija

// next we go to use ctoken hook usectoken.js
