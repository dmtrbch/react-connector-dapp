import React from 'react';
import { Container } from 'react-bootstrap';
import CasinoInteractionCard from './CasinoInteractionCard';
import ConnectWalletModal from '../../components/ConnectWalletModal';
import useWalletConnectionModal from '../../hooks/useWalletConnectionModal';
import LastThreeWinnersCard from '../../components/LastThreeWinnersCard';
const Home = () => {
  const { isWalletConnectModalOpen } = useWalletConnectionModal();
  return (
    <Container className="mt-2">
      {isWalletConnectModalOpen && <ConnectWalletModal />}
      <CasinoInteractionCard />
      <LastThreeWinnersCard />
    </Container>
  );
};

export default Home;
