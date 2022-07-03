import React from 'react';
import { Web3ReactProvider } from '@web3-react/core';
import { ethers } from 'ethers';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route } from 'react-router-dom';
import './styles/App.css';
import Home from './pages/Home';
import Header from './components/Header';
import { AppContextProvider } from './AppContext';

function getLibrary(provider) {
  return new ethers.providers.Web3Provider(provider);
}

const App = () => {
  return (
    <AppContextProvider>
      <Web3ReactProvider getLibrary={getLibrary}>
        <div>
          <Header />
          <Route exact path="/" component={Home} />
        </div>
      </Web3ReactProvider>
    </AppContextProvider>
  );
};

export default App;

// on line 18 this is where we set up our provider

// this is the provider that gives us access to the hooks throughtout the rest of the app

// essentully we need to pass this getLibrary function

// we can see on line 12 what it does it passes in the ethers provider

// this is where the library is injected

// and if we go back to the useContract
