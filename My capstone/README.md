# Udacity Blockchain Capstone

The capstone will build upon the knowledge you have gained in the course in order to build a decentralized housing product. 

# Project Resources

* [Remix - Solidity IDE](https://remix.ethereum.org/)
* [Visual Studio Code](https://code.visualstudio.com/)
* [Truffle Framework](https://truffleframework.com/)
* [Ganache - One Click Blockchain](https://truffleframework.com/ganache)
* [Open Zeppelin ](https://openzeppelin.org/)
* [Interactive zero knowledge 3-colorability demonstration](http://web.mit.edu/~ezyang/Public/graph/svg.html)
* [Docker](https://docs.docker.com/install/)
* [ZoKrates](https://github.com/Zokrates/ZoKrates)

Here is the contract address: 0x153A507d17Ba78bD6E6A1b379b34BCe938B79E60
Here is the account address: 0x71e49C30681137533F06bF08Da14e04d430b1442
Here is the directory to the application binary interface: /build/contracts/SolnSquareVerifier
Here is the link to my opensea: https://rinkeby.opensea.io/category/mycapstonerealestateprojectv9



Steps to execute the project:
Run "npm install"
Run "truffle compile"
Run truffle "truffle test test/TestSquareVerifier.js" ,"truffle test test/TestSolnSquareVerifier.js", and "truffle test test/TestERC721Mintable.js" to see the test results of the repectful implementations

Deploying Truffle Contracts to Rinkeby requires the command below
"truffle migrate --network rinkeby"

Also, one can run the "node script/mint.js" command to mint the 10 tokens


