import { useState, useEffect } from 'react';
import BuyForm from './BuyForm'
import SellForm from './SellForm'


const Main = (webData) => {
    const [currentForm, setCurrentForm] = useState('buy');

    const [ethBalance, setEthBalance] = useState('0');
    const [tokenBalance, setTokenBalance] = useState('0');
    const [buyTokens, setBuyTokens] = useState();
    const [sellTokens, setSellTokens] = useState();

    const [data, setData] = useState({ethBalance: '0', tokenBalance: '0', buyTokens: null, sellTokens: null});
    
    let content
    if(currentForm === 'buy') {
      content = <BuyForm
      data={data}
      />
    } else {
      content = <SellForm
      data={data}
      />
    }
    useEffect(() => {
        setData({...data, ethBalance:webData.ethBalance, tokenBalance: webData.tokenBalance, buyTokens: webData.buyTokens, sellTokens: webData.sellTokens})
        console.log("webData : ", webData)
    }, [webData])

    return ( 
        <div id="content" className="mt-3">
  
          <div className="d-flex justify-content-between mb-3">
            <button
                className="btn btn-light"
                onClick={(event) => {
                    setCurrentForm('buy')
                }}
              >
              Buy
            </button>
            <span className="text-muted">&lt; &nbsp; &gt;</span>
            <button
                className="btn btn-light"
                onClick={(event) => {
                    setCurrentForm('sell')
                }}
              >
              Sell
            </button>
          </div>
  
          <div className="card mb-4" >  
            <div className="card-body">  
              {content}  
            </div>  
          </div>  
        </div>
     );
}
 
export default Main;
