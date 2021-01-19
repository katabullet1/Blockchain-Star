const ERC721MintableComplete = artifacts.require("CustomERC721Token");
const truffleAssert = require('truffle-assertions');
//const { BN, shouldFail } = require('openzeppelin-test-helpers');

contract('TestERC721Mintable', function ([
    creator,
    ...accounts
]) {

    var account_one = accounts[0];
    var name = 'ERC Mintable';
    var symbol = 'ERC_Mint';
    var baseTokenURI = 'BTU';
    var tokenURI = 'TokenURI';
    var firstTokenId = 1;
    var secondTokenId = 2;
    var thirdTokenId = 3; 
    var fourthTokenId=4;
    var fifthTokenId=5;
    var newTokenId = 10;
    const minter = creator;
    const sampleUri = 'https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/1';


    const [owner, newOwner, another] = accounts;
    

    describe('match erc721 spec', function () {
        beforeEach(async function () { 
            this.token = await ERC721MintableComplete.new({from: creator});
    

            // TODO: mint multiple tokens
            await this.token.mint(owner, firstTokenId, tokenURI, { from: minter }); 

            await this.token.mint(owner, secondTokenId, tokenURI, { from: minter }); 
            await this.token.mint(owner, thirdTokenId, tokenURI, { from: minter }); 
            await this.token.mint(owner, fourthTokenId, tokenURI, { from: minter }); 
            await this.token.mint(owner, fifthTokenId, tokenURI, { from: minter }); 
 
        })
  
        it('should return total supply', async function () { 
 
            let totalSupply = await this.token.totalSupply.call();
            assert.equal(totalSupply,5  , "Total supply not met");

        })   

        it('should get token balance', async function () { 
          

            let tokenBalance = await this.token.balanceOf.call(account_one);
            assert.equal(tokenBalance, 5, "Token balance not met");
            
        })

        // token uri should be complete i.e: https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/1
        it('should return token uri', async function () { 

            let passedURI = "https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/1";
            let tokenURI = await this.token.tokenURI.call(1);
            assert.equal(tokenURI, passedURI, "wrong token URI");
        })

        it('should transfer token from one owner to another', async function () { 
            await this.token.transferFrom(owner, another, firstTokenId, { from: owner }); 
            let transferResult = await this.token.ownerOf(firstTokenId, {from: another}); 
            assert.equal(transferResult, accounts[0], "Failed Tokens transfer between accounts");

            
        })
    });

    describe('have ownership properties', function () {
        beforeEach(async function () { 
            //this.contract = await ERC721MintableComplete.new({from: account_one});
            this.token = await ERC721MintableComplete.new({from: creator});
        })

        it('should fail when minting when address is not contract owner', async function () { 
 
             // await shouldFail.reverting(this.token.mint(another, 100, tokenURI, {from: another}));



             let result = true;
             try {
                const account_two = accounts[1];
                 await this.token.mint(account_two, 6);
             } catch (err) {
                 result = false;
             }               
             assert.equal(result, false, "Minting is not possible when the address is not contract owner");
            
        })

        it('should return contract owner', async function () { 
            let contractOwner = await this.token.getOwner({from: owner});
            assert.equal(contractOwner, creator, "Not owner"); 
            //console.log(contractOwner);

            
        })

    });
})