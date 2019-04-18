const HDWalletProvider = require("truffle-hdwallet-provider")
const web3 = require('web3')
const MNEMONIC = "home planet dance upon crazy baby quantum claim tray drastic open butter";//"pride denial naive stamp humor praise energy diesel ordinary item segment chunk";
const RINKEBYADDRESS = 'https://rinkeby.infura.io/v3/654d5d6316934c58aad5ca44044e93de'  
const NFT_CONTRACT_ADDRESS ="0x153A507d17Ba78bD6E6A1b379b34BCe938B79E60" // "0x7F5Cf058bCB4d5dCC63ccB86B19e0288c1e4D8E3"  

const OWNER_ADDRESS = "0x71e49C30681137533F06bF08Da14e04d430b1442" 

const SOLARTIFACT = require('./build/contracts/SolnSquareVerifier');
const NUM_CREATURES = 10 
const tokenURI = 'TokenURI';
const NUM_LOOTBOXES = 4
const DEFAULT_OPTION_ID = 0
const LOOTBOX_OPTION_ID = 2

const proof = [require('./zokrates/code/square/proof'),
    require('./zokrates/code/square/proof1'),
    require('./zokrates/code/square/proof2'),
    require('./zokrates/code/square/proof3'),
    require('./zokrates/code/square/proof4'),
    require('./zokrates/code/square/proof5'),
    require('./zokrates/code/square/proof6'),
    require('./zokrates/code/square/proof7'),
    require('./zokrates/code/square/proof8'),
    require('./zokrates/code/square/proof9')];

const NFT_ABI = SOLARTIFACT.abi;

if (!MNEMONIC || !RINKEBYADDRESS || !OWNER_ADDRESS) {
    console.error("Please set a mnemonic, rinkebyAddress and contract address.")
    return
}


async function main() {
    
    const provider = new HDWalletProvider(MNEMONIC, RINKEBYADDRESS);
    const web3Instance = new web3(
        provider
    )
    const nftContract =new web3Instance.eth.Contract(NFT_ABI, NFT_CONTRACT_ADDRESS, { gasLimit: "2000000" });

          // Test if an ERC721 token can be minted for contract - SolnSquareVerifier
            // it('should test if an ERC721 token can be minted for contract - SolnSquareVerifier' , async function () {   
            //     await this.token.mint(account_two, firstTokenId, tokenURI, proof.proof.A, proof.proof.A_p, proof.proof.B, 
            //         proof.proof.B_p, proof.proof.C, proof.proof.C_p, proof.proof.H, proof.proof.K, proof.input,
            //         {from: account_one});
            // })

    let i = 0;
    proof.forEach(async function(proof){
      i ++;
      let results = await nftContract.methods.mint(OWNER_ADDRESS, i, tokenURI, proof.proof.A, proof.proof.A_p, proof.proof.B, proof.proof.B_p, 
      proof.proof.C, proof.proof.C_p, proof.proof.H, proof.proof.K, proof.input)
      .send({ from: OWNER_ADDRESS, gas: 6721975 }, (err, result) => {
          if(err){
            console.log(err);
          }else{
            console.log("Minted creature. Transaction: " + result); 
          }
      });
  });
}

main();
