import React from 'react';
import styled from 'styled-components';
import Button from 'react-bootstrap/Button';
import { useWeb3React } from '@web3-react/core';
import MMLogo from '../static/metamask-logo.svg';
import Text from './Text';
import Card from './Card';
import { injected } from '../connectors';
import { shortenAddress } from '../utils/shortenAddress';

const MetamaskLogo = styled.img.attrs({
  src: MMLogo,
})`
  height: 40px;
`;

const ConnectBtn = styled(Button).attrs({ variant: 'outline-dark' })``;

const MetamaskConnectButton = () => {
  const { activate, active, account, deactivate } = useWeb3React();

  if (active) {
    return (
      <Card className="d-flex flex-row justify-content-between" style={{ width: 360 }}>
        <MetamaskLogo />
        <Text uppercase color="green" t3 lineHeight="40px" className="mx-4">
          {shortenAddress(account)}
        </Text>
        <ConnectBtn onClick={deactivate}>Log Out</ConnectBtn>
      </Card>
    );
  }

  return (
    <Card className="d-flex flex-row justify-content-between" style={{ width: 350 }}>
      <MetamaskLogo />
      <Text uppercase color="green" t3 lineHeight="40px" className="mx-2">
        Metamask
      </Text>
      <ConnectBtn onClick={() => activate(injected)}>Connect</ConnectBtn>
    </Card>
  );
};

export default MetamaskConnectButton;

// the button right in the screen in the demo

// two different use cases here 1 on line 22 if you are active and web3 react exposes this hook here on line 20
// this is where the magic happens

// the expose this boolean called active and it bassicaly means - do you have an account connected
// if you are active you can see the jsx for this component shows the logo and shows the account

// on line 27 you are fetching your account from the same hook as active was and we are passing to the utils to format the address

// and there is a logout button, we are invoking a deactivate fucntion, on line 29, and that deactivate function comes from web3 react as well

// web3 react is awesome it gives us access to all sorts of information, wrapped one into an object

// gives as a lot of valuable information

// when we are not connected line 34, we need to provide a button for uses to connect their accounts, and this activate function (line 40)
// comes from web3 react and the parametor it takes in is called a connector
// web3 react library gives us access to a ton of different connectors, check them all out
// they have connector for almost all of the most used wallets, we are going to use mm only

// the sandbox code is the bible for using the conectors, bookmark this and check how they use to connectors to connect to different wallets

// web3 react gets 80% of the way

// on line 40 when we click on the activate button it is gonna activate the injected connector and lets take a look at this file

// connectors.js
