import { InjectedConnector } from '@web3-react/injected-connector';

export const injected = new InjectedConnector({ supportedChainIds: [1, 3, 42] });

// it is this simple
// we just pull the injected connector from web3 react library

// and then you can reference  supported chain ids

// chain id se misli na kakvi mrezhi kje mozhe da se povrzeme, ova 1 e za mainnet ether, 4 e za rinkeby

// next we go to is valid network hook useIsValidNetwork.js
