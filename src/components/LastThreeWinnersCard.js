import React, { useEffect } from 'react';
import styled from 'styled-components';
import Text from './Text';
import Card from './Card';
import { colors } from '../theme';
import { useWeb3React } from '@web3-react/core';
import { useCasino } from '../hooks/useCasino';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding-top: 30px;
  -webkit-box-align: center;
  align-items: center;
  flex: 1 1 0%;
  overflow: hidden auto;
  z-index: 1;
`;

const LastThreeWinnersCard = () => {
  const { account } = useWeb3React();
  const { fetchLastThreeWinners, lastThreeWinners } = useCasino();

  useEffect(async () => {
    if (account) {
      await fetchLastThreeWinners();
    }
  }, [account]);

  return (
    <Container show>
      <Card style={{ maxWidth: 420, minHeight: 320 }}>
        {lastThreeWinners.map((winner, index) => (
          <Text key={index} block color={colors.green} className="mb-3">
            Winner {index + 1}: {winner}
          </Text>
        ))}
      </Card>
    </Container>
  );
};

export default LastThreeWinnersCard;
