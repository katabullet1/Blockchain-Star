var SolnSquareVerifier = artifacts.require("SolnSquareVerifier");
var verifier = artifacts.require('Verifier');


contract('TestERC721Mintable', accounts => {

    const name = 'Deep Real Estate';
    const symbol = 'SNN';
 
 
    const baseTokenURI = "https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/";

    
    
    describe('Verification', function () {
        beforeEach(async function () { 
            let verifierContract = await verifier.new({from: accounts[0]});
            this.SolnSquareVerifier = await SolnSquareVerifier.new(verifierContract.address , {from: accounts[0]});                
        })

        // Test if a new solution can be added for contract - SolnSquareVerifier
        let sols = true;
        let index = 10
        let byteText32 = "0x7465737400000000000000000000000000000000000000000000000000000000";
        try{
            it('Test if a new solution can be added for contract' , async function () { 
                await this.SolnSquareVerifier.addSolution(accounts[0], index, byteText32, {from: accounts[0]});
            })
          }
          catch(e){
              sols = false;
          } 
          assert.equal(sols, true, "Add new solution - Unsuccessful ");    
          
            
        
        // Test if an ERC721 token can be minted for contract - SolnSquareVerifier and also tests if new soluction can be added to contract
        it('Test if an ERC721 token can be minted for contract - SolnSquareVerifier' , async function () {   
            let minting = true;

            let proofs = {
                "proof":
                {
                    "A":["0xecb6fcf44dc7f11d69deeafddc260fdcedb05ea4ce6607d6304895587387f0b", "0x77682707327fc21d354ae1a7cec5483d6141f779f328387ea16d532e6174771"],
                    "A_p":["0x2bacba4e56eea3bd84f627a1e05fdd917ed79f281bc99de8f95dbf8e34d10af", "0x2c2d36dc1d3ba4ef79dfdcba78e1b961f8e7e03b4856131d2a73c61e5638c08f"],
                    "B": ["0x20bb7a65debd153e431be370c722a3367046203da5d17bd1b426a71b538f91", "0x283919be226180adf49c585b9e87296be0629bb2661acc93659838ddc3f42924"],  
                    
                    "B_p":["0x2f36ac079f8b7d0d26aaf16445ed5fc1cea06fb414cbdb2891981270f331730f", "0x2bb60d5f488923b47681f81ff8ae2360e1a9bbc104e8a0db5d751b05e62bcfb4"],
                    "C":["0x6e4b1db40aa5c013a3f1e80e75e6314bc90e80a46966b1c2bc474ded18d36e9", "0x2ac2be2bd3a174cb8df23f39a782a5b1e498f32a289760e3a176ab06834d2ee6"],
                    "C_p":["0x2ed4325d9a66b33df13f73af2dac4099a88371fc79fd009fd93e00c3c2d809ca", "0xdb89edeb130aed09cedf0b9b8eb88696f8729170f75eacc38af70fdbff9d0fa"],
                    "H":["0x2a2fde09937e1089a483251f175dae001c17f3dd089ccf5dc773819150831987", "0xcacb0569ccd7bc3cdc252f29e3497fe302e0915946e715deca8a22a4c279e26"],
                    "K":["0x13ca218ff9ad542ad99bd1592a942c1f8da18f5fcf50bf7caa5d3fd431a4d7fe", "0x1c2acb6488f7d2c4541aa290e11493d71b03fa0cc7042f010ffecba8d85bf403"]
                },
                "input":[9,1]
    
            };
            let firstTokenId = 1
            try {
                await this.SolnSquareVerifier.mint(accounts[0], firstTokenId, tokenURI, proofs.proof.A, proofs.proof.A_p,
                     proofs.proof.B, proofs.proof.B_p, proofs.proof.C, proofs.proof.C_p, proofs.proof.H, proofs.proofs.K,
                      proofs.input, {from: accounts[0]});
            } catch (e) {
                reverting = false;
            }
            assert.equal(minting, true, "Sorry! Minting was unsuccessful");
  
        })

   
    });
});

 

