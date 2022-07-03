import { useState } from 'react';
import { useContract } from './useContract';
import CASINO_ABI from '../static/casinoABI';
import useIsValidNetwork from './useIsValidNetwork';
import { useWeb3React } from '@web3-react/core';
import { useAppContext } from '../AppContext';
import { formatEther, formatUnits, parseEther } from '@ethersproject/units';
import useEth from './useEth';

export const useCasino = () => {
  const { account } = useWeb3React();
  const { isValidNetwork } = useIsValidNetwork();
  const CasinoContractAddress = '0x21fFc72933CCB2a447F9172A5190551cd37b3d48'; // ropsten
  const CasinoContract = useContract(CasinoContractAddress, CASINO_ABI);
  const {
    setCasinoBalance,
    setCurrentBetAmount,
    setTxnStatus,
    setCasinoNumber,
    setBetStatus,
    casinoBalance,
    currentBetAmount,
    casinoNumber,
    betStatus,
  } = useAppContext();
  const { ethBalance, fetchEthBalance } = useEth();
  const [lastThreeWinners, setLastThreeWinners] = useState([]);

  const fetchCasinoBalance = async () => {
    const casinoBalance = await CasinoContract.getCasinoBalance();
    setCasinoBalance(parseFloat(formatEther(casinoBalance)).toPrecision(4));
  };

  const getCurrentBetAmount = async () => {
    const currentBetAmount = await CasinoContract.gameWeiValues(account);
    setCurrentBetAmount(parseFloat(formatEther(currentBetAmount)).toPrecision(4));
  };

  const fetchLastThreeWinners = async (_) => {
    let winners = [];
    for (let i = 0; i < 3; i++) {
      const winner = await CasinoContract.lastThreeWinners(i);
      winners.push(winner);
    }
    console.log(winners);
    setLastThreeWinners(winners);
  };

  const checkOddOrEven = (result) => {
    setCasinoNumber(result);
    const lastDigit = result.charAt(result.length - 1);
    if (Number(lastDigit) % 2 == 0) {
      setBetStatus('WON');
    } else {
      setBetStatus('LOST');
    }
  };

  const playGame = async (amount) => {
    if (account && isValidNetwork) {
      try {
        setTxnStatus('LOADING');
        const txn = await CasinoContract.playGame({
          from: account,
          value: parseEther(amount),
        });
        await txn.wait(1);
        await fetchCasinoBalance();
        await getCurrentBetAmount();
        await fetchEthBalance();
        setBetStatus('--');
        setTxnStatus('COMPLETE');
      } catch (error) {
        setTxnStatus('ERROR');
      }
    }
  };

  const checkResult = async () => {
    if (account && isValidNetwork) {
      try {
        setTxnStatus('LOADING');
        const txn = await CasinoContract.playGame({
          from: account,
        });
        CasinoContract.on('BetFinished', async (sender, randomNumber, amount) => {
          checkOddOrEven(randomNumber.toString());
          await txn.wait(1);
          await fetchCasinoBalance();
          await getCurrentBetAmount();
          await fetchEthBalance();
          await fetchLastThreeWinners();
          setTxnStatus('COMPLETE');
        });
      } catch (error) {
        setTxnStatus('ERROR');
      }
    }
  };

  /* useEffect(() => {
    if (account) {
      getCurrentBetAmount();
    }
  }, [account]); */

  return {
    casinoBalance,
    currentBetAmount,
    casinoNumber,
    betStatus,
    getCurrentBetAmount,
    fetchCasinoBalance,
    playGame,
    checkResult,
    fetchLastThreeWinners,
    lastThreeWinners,
  };
};

//  on line 13

// here we can use the usecontract hook

// and we only need to pass two pieces of information

// in order to create the contract instance

// the token address for the contract line 12

// and the abi for it

// on line 13 we are instaniating a new contract instance

// on line 35 we have got the mint function

// this comes from the abi

//  you can call the contract method on the instance we have created

// we were doing the same while we were testing the smart contracts in truffle

// we are swith talking about the Context and managing state

// the main reason that the context is used is to be able to share the state between mutiple different hooks

// if you can imagine an application with mutiple different pages, mutiple different components that are reading the same data

// we want an easy way to share that state to multiple components without having to fetch always inside every component individually and directly from there

// go to AppContext.js

// po vtor pat

// we have bunch od different methods for interacting with the contract we will put the logic for interacting with the casino here

// getting balance for the see token

// getting the exchange rate

// the actual deposit fucntion that submimt the transaction to put eth to the contract and get ceth back

// this is smiliar to the depositor coin part of our stable coin excercise we were doing

// we can try to mint, metamask is pulling up the contract functions from the abi same as we are we can see that in the mm ui

// if we click confirmm we will se the transaction on the blockchain

// on line 35 we call the mint function

// the next line 39 is the txn.wait, we are telling the tx to wait untill we get a confirmed transaction

// if we leave 1 the transaction was included in a block and it completed

// then we fetch the c token balance because is changed now and we change the txn status to complete

// u sluchaj na error we set txn status to error

// that is the full flow from frontend to connect, to reading from web3, to writing to web3
