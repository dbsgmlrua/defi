import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEthereum } from "@fortawesome/free-brands-svg-icons";
import { useState, useEffect } from 'react';

const BuyForm = (webData) => {
    let ethLogo = <FontAwesomeIcon icon={faEthereum} size="lg"/>
    let tokenLogo = <FontAwesomeIcon icon={faEthereum} size="lg"/>
    const [output, setOutput] = useState('0');
    const [inputData, setInputData] = useState('0');

    const [data, setData] = useState({ethBalance: '0', tokenBalance: '0', buyTokens: null, sellTokens: null});

    useEffect(() => {
        setData({...data, ethBalance:webData.data.ethBalance, tokenBalance: webData.data.tokenBalance, buyTokens: webData.data.buyTokens, sellTokens: webData.data.sellTokens})
    }, [webData])
    return ( 
      <form className="mb-3" onSubmit={(event) => {
        event.preventDefault()
        let etherAmount
        console.log("input", inputData)
        etherAmount = window.web3.utils.toWei(inputData, 'Ether')
        data.buyTokens(etherAmount)
      }}>
      <div>
        <label className="float-left"><b>Input</b></label>
        <span className="float-right text-muted">
          Balance: {window.web3.utils.fromWei(data.ethBalance, 'Ether')}
        </span>
      </div>
      <div className="input-group mb-4">
        <input
          type="text"
          onChange={(event) => {
            setInputData(event.target.value)
            const etherAmount = event.target.value
            setOutput(etherAmount * 100)
          }}
          className="form-control form-control-lg"
          placeholder="0"
          required />
        <div className="input-group-append">
          <div className="input-group-text">
            {ethLogo}&nbsp;&nbsp;&nbsp; ETH
          </div>
        </div>
      </div>
      <div>
        <label className="float-left"><b>Output</b></label>
        <span className="float-right text-muted">
          Balance: {window.web3.utils.fromWei(data.tokenBalance, 'Ether')}
        </span>
      </div>
      <div className="input-group mb-2">
        <input
          type="text"
          className="form-control form-control-lg"
          placeholder="0"
          value={output}
          disabled
        />
        <div className="input-group-append">
          <div className="input-group-text">
            {tokenLogo} &nbsp; DApp
          </div>
        </div>
      </div>
      <div className="mb-5">
        <span className="float-left text-muted">Exchange Rate</span>
        <span className="float-right text-muted">1 ETH = 100 DApp</span>
      </div>
      <button type="submit" className="btn btn-primary btn-block btn-lg">SWAP!</button>
    </form>
     );
}
 
export default BuyForm;