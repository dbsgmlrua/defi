const Token = artifacts.require('Token')
const Swap = artifacts.require('Swap')

require('chai')
  .use(require('chai-as-promised'))
  .should()


function tokens(n) {
    return web3.utils.toWei(n, 'ether');
}

contract('EthSwap', ([deployer, investor])=>{
    let token, ethSwap

    before(async () => {
        token = await Token.new(1000000)
        ethSwap = await Swap.new(token.address)

        await token.transfer(ethSwap.address, tokens('1000000'))
    })

    describe('Token deployment', async () => {
      it('contract has a name', async () => {
        const name = await token.name()
        assert.equal(name, 'LeeJaeMyeong')
      })
    })

    describe('EthSwap deployment', async () => {
      it('contract has a name', async () => {
        const name = await ethSwap.name()
        assert.equal(name, 'EthSwap Instant Exchange')
      })
  
      it('contract has tokens', async () => {
        let balance = await token.balanceOf(ethSwap.address)
        assert.equal(balance.toString(), tokens('1000000'))
      })
    })

    describe('buyTokens()', async () => {
      let result
  
      before(async () => {
        // Purchase tokens before each example
        result = await ethSwap.buyTokens({ from: investor, value: tokens('1')})
      })
  
      it('Allows user to instantly purchase tokens from ethSwap for a fixed price', async () => {
        // Check investor token balance after purchase
        let investorBalance = await token.balanceOf(investor)
        assert.equal(investorBalance.toString(), tokens('100'))
  
        // Check ethSwap balance after purchase
        let ethSwapBalance
        ethSwapBalance = await token.balanceOf(ethSwap.address)
        assert.equal(ethSwapBalance.toString(), tokens('999900'))
        ethSwapBalance = await web3.eth.getBalance(ethSwap.address)
        assert.equal(ethSwapBalance.toString(), tokens('1'))
  
        // Check logs to ensure event was emitted with correct data
        const event = result.logs[0].args
        assert.equal(event.account, investor)
        assert.equal(event.token, token.address)
        assert.equal(event.amount.toString(), tokens('100').toString())
        assert.equal(event.rate.toString(), '100')
      })
    })
})