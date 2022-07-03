import { useMemo } from 'react';
import { useWeb3React } from '@web3-react/core';

const supportedCasinoNetworks = [3];

function useIsValidNetwork() {
  const { chainId } = useWeb3React();
  const isValidCasinoNetwork = useMemo(() => {
    return supportedCasinoNetworks.includes(chainId);
  }, [chainId]);

  return {
    isValidNetwork: isValidCasinoNetwork,
  };
}

export default useIsValidNetwork;

// line 4 supported networks

// are you connect to ropsten if you are not you will show a modal to tell them to switch

// networks are pretty annoyng

// I will say that developers often overestimated the importance of dev network

// metamask exposes with api to add (switch) chain id

// lets take a look of how we get the balance, open useContract.js
