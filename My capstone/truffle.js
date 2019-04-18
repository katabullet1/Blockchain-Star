


var HDWalletProvider = require("truffle-hdwallet-provider");
var mnemonic = "home planet dance upon crazy baby quantum claim tray drastic open butter" ; 
//source https://medium.com/coinmonks/the-many-ways-to-deploy-your-smart-contract-to-rinkeby-network-38cadf7b20be
var rinkebyAddress = 'https://rinkeby.infura.io/v3/654d5d6316934c58aad5ca44044e93de' ; 
module.exports = {
  networks: { 
    development: {
      host: '127.0.0.1',
      port: 7545,
      network_id: "*"
    }, 
    rinkeby: {
      provider: function() { 
        return new HDWalletProvider(mnemonic, rinkebyAddress) 
      },
      network_id: "*",
      gas:6721975,
      gasPrice: 20000000000
    }
  },
  compilers: {
      solc: {
        version: "^0.5.0"
      }
    }
};






