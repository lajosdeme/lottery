
const Lottery = artifacts.require('Lottery')

contract("Lottery", async accounts => {
    it('checks the lottery address', () => {
        Lottery.deployed().then(_instance => assert.ok(_instance.address))
    })

    it('enters one account', async () => {
        await Lottery.deployed()
        .then(async instance => {
            await instance.enter({
                from: accounts[0],
                value: web3.utils.toWei('0.011', 'ether')
            })
            const players = await instance.getPlayers()
            await assert.strictEqual(accounts[0], players[0])
        })
    })

    it('enters two accounts', async () => {
        await Lottery.deployed()
        .then(async instance => {
            await instance.enter({
                from: accounts[1],
                value: web3.utils.toWei('0.011', 'ether')
            })

            const players = await instance.getPlayers()

            assert.strictEqual(accounts[1], players[1])
        })
    })

    it('requires a min amount of ether', async () => {
        await Lottery.deployed().then(async instance => {
            try {
                await instance.enter({
                    from: accounts[2],
                    value: '200'
                })
                assert(false)
            } catch(err) {
                assert(err)
            }
        })
    })

    it('only manager can pick winner', async () => {
        await Lottery.deployed().then(async instance => {
            try {
                await instance.pickWinner({from: accounts[1]})
                assert(false)
            } catch(err) {
                assert(err)
            }
        })
    })

    it('sends money to winner and resets players array', async () => {
        await Lottery.deployed().then(async instance => {
            const initialBalance = await web3.eth.getBalance(accounts[0])
            await instance.pickWinner({from: accounts[0]})
            const newBalance = await web3.eth.getPlayers(accounts[0])
            assert.notEqual(initialBalance, newBalance)
        })
    })
})