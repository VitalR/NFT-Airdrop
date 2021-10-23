const Ganache = require('./helpers/ganache')
const { expect, assert, util } = require('chai')
const { BigNumber, utils } = require('ethers')
const { ethers } = require('hardhat')


describe('Minting Art', function() {
    const bn = (input) => BigNumber.from(input)
    const assertBNequal = (bnOne, bnTwo) => assert.strictEqual(bnOne.toString(), bnTwo.toString())

    const ganache = new Ganache()
    const baseUnit = 8

    let accounts
    let owner
    let user
    let userTwo

    const name = "ART"
    const symbol = "ART"
    const numberOfTokens = 1
    const tokenId1 = 1
    const tokenId2 = 2

    let tokenURI =       ["tokenURI_1"]
    let tokenUriBundle = ["tokenURI_1", "tokenURI_2", "tokenURI_3", "tokenURI_4", "tokenURI_5", "tokenURI_6", "tokenURI_7", "tokenURI_8", "tokenURI_9", "tokenURI_10",
                          "tokenURI_11", "tokenURI_12", "tokenURI_13", "tokenURI_14", "tokenURI_15", "tokenURI_16", "tokenURI_17", "tokenURI_18", "tokenURI_19", "tokenURI_20"]
    let tokenUriBundle21 = ["tokenURI_1", "tokenURI_2", "tokenURI_3", "tokenURI_4", "tokenURI_5", "tokenURI_6", "tokenURI_7", "tokenURI_8", "tokenURI_9", "tokenURI_10",
                          "tokenURI_11", "tokenURI_12", "tokenURI_13", "tokenURI_14", "tokenURI_15", "tokenURI_16", "tokenURI_17", "tokenURI_18", "tokenURI_19", "tokenURI_20","tokenURI_21"]
    let tokenUriBundle100 = ["tokenURI_1", "tokenURI_2", "tokenURI_3", "tokenURI_4", "tokenURI_5", "tokenURI_6", "tokenURI_7", "tokenURI_8", "tokenURI_9", "tokenURI_10",
                             "tokenURI_11", "tokenURI_12", "tokenURI_13", "tokenURI_14", "tokenURI_15", "tokenURI_16", "tokenURI_17", "tokenURI_18", "tokenURI_19", "tokenURI_20",
                             "tokenURI_21", "tokenURI_22", "tokenURI_23", "tokenURI_24", "tokenURI_25", "tokenURI_26", "tokenURI_27", "tokenURI_28", "tokenURI_29", "tokenURI_30",
                             "tokenURI_31", "tokenURI_32", "tokenURI_33", "tokenURI_34", "tokenURI_35", "tokenURI_36", "tokenURI_37", "tokenURI_38", "tokenURI_39", "tokenURI_40",
                             "tokenURI_41", "tokenURI_42", "tokenURI_43", "tokenURI_44", "tokenURI_45", "tokenURI_46", "tokenURI_47", "tokenURI_48", "tokenURI_49", "tokenURI_50",
                             "tokenURI_51", "tokenURI_52", "tokenURI_53", "tokenURI_54", "tokenURI_55", "tokenURI_56", "tokenURI_57", "tokenURI_58", "tokenURI_59", "tokenURI_60",
                             "tokenURI_61", "tokenURI_62", "tokenURI_63", "tokenURI_64", "tokenURI_65", "tokenURI_66", "tokenURI_67", "tokenURI_68", "tokenURI_69", "tokenURI_70",
                             "tokenURI_71", "tokenURI_72", "tokenURI_73", "tokenURI_74", "tokenURI_75", "tokenURI_76", "tokenURI_77", "tokenURI_78", "tokenURI_79", "tokenURI_80",
                             "tokenURI_81", "tokenURI_82", "tokenURI_83", "tokenURI_84", "tokenURI_85", "tokenURI_86", "tokenURI_87", "tokenURI_88", "tokenURI_89", "tokenURI_90",
                             "tokenURI_91", "tokenURI_92", "tokenURI_93", "tokenURI_94", "tokenURI_95", "tokenURI_96", "tokenURI_97", "tokenURI_98", "tokenURI_99", "tokenURI_100"]
    let tokenUriBundle101 = ["tokenURI_1", "tokenURI_2", "tokenURI_3", "tokenURI_4", "tokenURI_5", "tokenURI_6", "tokenURI_7", "tokenURI_8", "tokenURI_9", "tokenURI_10",
                            "tokenURI_11", "tokenURI_12", "tokenURI_13", "tokenURI_14", "tokenURI_15", "tokenURI_16", "tokenURI_17", "tokenURI_18", "tokenURI_19", "tokenURI_20",
                            "tokenURI_21", "tokenURI_22", "tokenURI_23", "tokenURI_24", "tokenURI_25", "tokenURI_26", "tokenURI_27", "tokenURI_28", "tokenURI_29", "tokenURI_30",
                            "tokenURI_31", "tokenURI_32", "tokenURI_33", "tokenURI_34", "tokenURI_35", "tokenURI_36", "tokenURI_37", "tokenURI_38", "tokenURI_39", "tokenURI_40",
                            "tokenURI_41", "tokenURI_42", "tokenURI_43", "tokenURI_44", "tokenURI_45", "tokenURI_46", "tokenURI_47", "tokenURI_48", "tokenURI_49", "tokenURI_50",
                            "tokenURI_51", "tokenURI_52", "tokenURI_53", "tokenURI_54", "tokenURI_55", "tokenURI_56", "tokenURI_57", "tokenURI_58", "tokenURI_59", "tokenURI_60",
                            "tokenURI_61", "tokenURI_62", "tokenURI_63", "tokenURI_64", "tokenURI_65", "tokenURI_66", "tokenURI_67", "tokenURI_68", "tokenURI_69", "tokenURI_70",
                            "tokenURI_71", "tokenURI_72", "tokenURI_73", "tokenURI_74", "tokenURI_75", "tokenURI_76", "tokenURI_77", "tokenURI_78", "tokenURI_79", "tokenURI_80",
                            "tokenURI_81", "tokenURI_82", "tokenURI_83", "tokenURI_84", "tokenURI_85", "tokenURI_86", "tokenURI_87", "tokenURI_88", "tokenURI_89", "tokenURI_90",
                            "tokenURI_91", "tokenURI_92", "tokenURI_93", "tokenURI_94", "tokenURI_95", "tokenURI_96", "tokenURI_97", "tokenURI_98", "tokenURI_99", "tokenURI_100", "tokenURI_101"]


    beforeEach('setup others', async function() {
        accounts = await ethers.getSigners()
        owner = accounts[0]
        user = accounts[1]
        userTwo = accounts[2]

        // console.log("owner: ", owner.address)
        // console.log("user: ", user.address)

        const ArtAirdrop = await ethers.getContractFactory("ArtAirdrop")
        artToken = await ArtAirdrop.deploy(owner.address)
        await artToken.deployed()

        await ganache.snapshot()
    })

    afterEach('revert', function() { return ganache.revert(); })


    it('Should revert reserveART() if caller is not the owner', async function() {
        await expect(artToken.connect(user).reserveART(
          user.address,
          tokenURI,
          numberOfTokens
        )).to.be.revertedWith('ART: caller is not the owner')
    })

    it('Should be able to mint without funds if caller is the owner', async function() {
        await artToken.reserveART(
          owner.address,
          tokenURI,
          numberOfTokens
        )
        const ownerBalance = await artToken.balanceOf(owner.address)
        assertBNequal(ownerBalance, 1)

        const ownerOfAddress = await artToken.ownerOf(tokenId1)
        assert.strictEqual(ownerOfAddress, owner.address)
        
        const tokenName = await artToken.name()
        assert.strictEqual(tokenName, name)
        
        const tokenSymbol = await artToken.symbol()
        assert.strictEqual(tokenSymbol, symbol)

        let arr = []
        let tokenUri = await artToken.tokenURI(tokenId1)
        arr.push(tokenUri)
        assert.notStrictEqual(arr, tokenURI)
    })

    it('Should be able to mint without funds for another user if caller is the owner', async function() {
        const ownerBalanceBefore = await artToken.balanceOf(owner.address)
        assertBNequal(ownerBalanceBefore, 0)
        const userBalanceBefore = await artToken.balanceOf(user.address)
        assertBNequal(userBalanceBefore, 0)
        
        await artToken.reserveART(
          user.address,
          tokenURI,
          numberOfTokens
        )

        const ownerBalanceAfter = await artToken.balanceOf(owner.address)
        assertBNequal(ownerBalanceAfter, 0)
        const userBalanceAfter = await artToken.balanceOf(user.address)
        assertBNequal(userBalanceAfter, 1)
    })

    it('Should be able to mint 20 tokens without funds if caller is the owner', async function() {
        const numberOfTokens = 20
        const ownerBalanceBefore = await artToken.balanceOf(owner.address)
        assertBNequal(ownerBalanceBefore, 0)
        await artToken.reserveART(
          owner.address,
          tokenUriBundle,
          numberOfTokens
        )
        const ownerBalanceAfter = await artToken.balanceOf(owner.address)
        assertBNequal(ownerBalanceAfter, 20)
    })

    it('Should be able to mint with appropriate value if caller is the user', async function() {
        const purchaseValue = utils.parseEther('0.08')
        const ownerEthBalanceBefore = await ethers.provider.getBalance(owner.address)
        
        const userBalanceBefore = await artToken.balanceOf(user.address)
        assertBNequal(userBalanceBefore, 0)

        await artToken.connect(user).mintART(
          user.address,
          tokenURI,
          numberOfTokens,
          { value: purchaseValue },
        )
        const userBalanceAfter = await artToken.balanceOf(user.address)
        assertBNequal(userBalanceAfter, 1)

        const ownerEthBalanceAfter = await ethers.provider.getBalance(owner.address)
        expect(ownerEthBalanceAfter).be.gt(ownerEthBalanceBefore)
    })

    it('Should be reverted in case not enough value provided by user', async function() {
        const purchaseValue = utils.parseEther('0.07')
        const userBalanceBefore = await artToken.balanceOf(user.address)
        assertBNequal(userBalanceBefore, 0)
        
        await expect(artToken.connect(user).mintART(
          user.address,
          tokenURI,
          numberOfTokens,
          { value: purchaseValue },
        )).to.be.revertedWith("ART: incorrect Ether value")
        
        const userBalanceAfter = await artToken.balanceOf(user.address)
        assertBNequal(userBalanceAfter, 0)
    })

    it('Should be able to mint 20 tokens with appropriate value if caller is the user', async function() {
        const numberOfTokens = 20
        const purchaseValue = utils.parseEther('1.6')
        const userBalanceBefore = await artToken.balanceOf(user.address)
        assertBNequal(userBalanceBefore, 0)

        await artToken.connect(user).mintART(
          user.address,
          tokenUriBundle,
          numberOfTokens,
          { value: purchaseValue },
        )

        const userBalanceAfter = await artToken.balanceOf(user.address)
        assertBNequal(userBalanceAfter, 20)
    })

    it('Should be reverted minting 21 tokens with appropriate value for one user', async function() {
        const numberOfTokens = 21
        const purchaseValue = utils.parseEther('1.68')
        const userBalanceBefore = await artToken.balanceOf(user.address)
        assertBNequal(userBalanceBefore, 0)

        await expect(artToken.connect(user).mintART(
          user.address,
          tokenUriBundle21,
          numberOfTokens,
          { value: purchaseValue },
        )).to.be.revertedWith("ART: max purchase per user exceeded")

        const userBalanceAfter = await artToken.balanceOf(user.address)
        assertBNequal(userBalanceAfter, 0)
    })

    it('Should be able to change tokenURI if caller is the owner', async function() {
        await artToken.reserveART(
          owner.address,
          tokenURI,
          numberOfTokens
        )
        const tokenUri1 = await artToken.tokenURI(tokenId1)

        const tokenURI_2 = "tokenURI_2"
        await artToken.setTokenURI(tokenId1, tokenURI_2)
        const tokenUri2 = await artToken.tokenURI(tokenId1)

        assert.notEqual(tokenUri1, tokenUri2)
    })

    it('Should be reverted setTokenURI() if caller is not the owner', async function() {
        await expect(artToken.connect(user).reserveART(
          owner.address,
          tokenURI,
          numberOfTokens
        )).to.be.revertedWith('ART: caller is not the owner')
    })

    it('Should be reverted isURLReserved() if tokenURI is already used', async function() {
        const tokenURI_1 = ["tokenURI_1"]
        const tokenURI_2 = "tokenURI_1"
        await artToken.reserveART(
          owner.address,
          tokenURI_1,
          numberOfTokens
        )
        await expect(artToken.setTokenURI(
            tokenId1, 
            tokenURI_2
        )).to.be.revertedWith('ART: URL already reserved or tries to set URI of nonexistent token')
    })

    it('Should be able to mint 100 tokens if caller is the user', async function() {
        const numberOfTokens = 100
        const userBalanceBefore = await artToken.balanceOf(owner.address)
        assertBNequal(userBalanceBefore, 0)

        await artToken.reserveART(
          owner.address,
          tokenUriBundle100,
          numberOfTokens,
        )

        const userBalanceAfter = await artToken.balanceOf(owner.address)
        assertBNequal(userBalanceAfter, 100)
    })

    it('Should be reverted minting 101 tokens for one user', async function() {
        const numberOfTokens = 101
        const userBalanceBefore = await artToken.balanceOf(owner.address)
        assertBNequal(userBalanceBefore, 0)

        await expect(artToken.reserveART(
          owner.address,
          tokenUriBundle101,
          numberOfTokens,
        )).to.be.revertedWith("ART: max reserve count exceeded")

        const userBalanceAfter = await artToken.balanceOf(owner.address)
        assertBNequal(userBalanceAfter, 0)
    })

    it('Should be reverted in case invalid number of tokens', async function() {
        const purchaseValue = utils.parseEther('0.08')
        await expect(artToken.connect(user).mintART(
          userTwo.address,
          tokenURI,
          0,
          { value: purchaseValue },
        )).to.be.revertedWith("ART: invalid number of tokens")
    })

    it('Should be reverted in case not appropriate number of tokens and tokenURIs', async function() {
        const purchaseValue = utils.parseEther('0.08')
        await expect(artToken.connect(user).mintART(
          userTwo.address,
          tokenURI,
          2,
          { value: purchaseValue },
        )).to.be.revertedWith("ART: not appropriate number of tokens and tokenURIs")
    })

    it('Should be reverted setTokenURI() if tokenURI is empty', async function() {
        const tokenURI_1 = ["tokenURI_1"]
        await artToken.reserveART(
          owner.address,
          tokenURI_1,
          numberOfTokens
        )
        await expect(artToken.setTokenURI(
            tokenId1, 
            0
        )).to.be.revertedWith('ART: tokenURI is empty')
    })

    it('Should be reverted minting if caller URL already reserved', async function() {
        const tokenURI = ['tokenURI1','tokenURI1']
        const purchaseValue = utils.parseEther('0.16')
        const ownerEthBalanceBefore = await ethers.provider.getBalance(owner.address)
        
        const userBalanceBefore = await artToken.balanceOf(user.address)
        assertBNequal(userBalanceBefore, 0)

        await expect(artToken.connect(user).mintART(
          user.address,
          tokenURI,
          2,
          { value: purchaseValue },
        )).to.be.revertedWith('ART: URL already reserved')

        const userBalanceAfter = await artToken.balanceOf(user.address)
        assertBNequal(userBalanceAfter, 0)
    })
})