import './App.css';
import { useState, useEffect } from 'react';
import Web3 from 'web3'
import Token from './abis/Token.json'
import EthSwap from './abis/Swap.json'
import ReactNav from './ReactNav';
import Main from './Main';

function App() {
  const [account, setAccount] = useState('');
  const [token, setToken] = useState(null);
  const [ethSwap, setEthSwap] = useState(null);
  const [tokenBalance, setTokenBalance] = useState('0');
  const [ethBalance, setEthBalance] = useState('0');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function componentWillMount(){
      await loadBlockchainData()
    }
    async function loadBlockchainData(){
      if (window.ethereum) {
          window.web3 = new Web3(window.ethereum);
          await window.ethereum.enable();
      }
      else if (window.web3) {
          window.web3 = new Web3(window.web3.currentProvider);
      }
      else {
          window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!');
          return;
      }
      const web3 = window.web3
      // Load account
      const accounts = await web3.eth.getAccounts()
      setAccount(accounts[0]);

      const ethBalance = await web3.eth.getBalance(accounts[0])
      setEthBalance(ethBalance)
      const networkId = await web3.eth.net.getId()
      const tokenData = Token.networks[networkId]
      if(tokenData) {
        const token = new web3.eth.Contract(Token.abi, tokenData.address)
        setToken(token)
        let tokenBalance = await token.methods.balanceOf(accounts[0]).call()
        setTokenBalance(tokenBalance.toString())
      } else {
        window.alert('Token contract not deployed to detected network.')
      }

      // Load EthSwap
      const ethSwapData = EthSwap.networks[networkId]
      if(ethSwapData) {
        const ethSwap = new web3.eth.Contract(EthSwap.abi, ethSwapData.address)
        setEthSwap(ethSwap)
      } else {
        window.alert('EthSwap contract not deployed to detected network.')
      }
  
      setIsLoading(false);
      
    }
    componentWillMount();
  }, [])

  const buyTokens = (etherAmount) => {
    console.log('BUYYYY!!!')
    setIsLoading(true);
    ethSwap.methods.buyTokens().send({ value: etherAmount, from: account }).on('transactionHash', (hash) => {
      setIsLoading(false);
    })
  }

  const sellTokens = (tokenAmount) => {
    console.log('SELLLLL!!!')
    setIsLoading(true);
    token.methods.approve(ethSwap._address, tokenAmount).send({ from: account }).on('transactionHash', (hash) => {
      ethSwap.methods.sellTokens(tokenAmount).send({ from: account }).on('transactionHash', (hash) => {
        setIsLoading(false);
      })
    })
  }

  return (
    <div className="App">
      <ReactNav account={account}/>
      {isLoading && <p id="loader" className="text-center">Loading...</p>}
      {!isLoading && <Main
        ethBalance={ethBalance}
        tokenBalance={tokenBalance}
        buyTokens={buyTokens}
        sellTokens={sellTokens}
      />}
    </div>
  );
}

export default App;
