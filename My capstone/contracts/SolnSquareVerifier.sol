pragma solidity >=0.4.21 <0.6.0;


import "./verifier.sol";
import "./ERC721Mintable.sol";
 // TODO define a contract call to the zokrates generated solidity contract <Verifier> or <renamedVerifier>

 
contract SolnSquareVerifier is CustomERC721Token {
    Verifier public verifier;

 

    constructor(address verifierAddy)
    public

    {  
        verifier = Verifier(verifierAddy);
    }



    

// TODO define another contract named SolnSquareVerifier that inherits from your ERC721Mintable class



// TODO define a solutions struct that can hold an index & an address
    struct Solutions {
        address owner;
        uint256 index;        
    }


// TODO define an array of the above struct
    Solutions[] private solutions;


// TODO define a mapping to store unique solutions submitted

    mapping(bytes32 => Solutions) private uniqueSolutions;

// TODO Create an event to emit when a solution is added
 
    event AddedSolution(address indexed owner, uint256 input);


// TODO Create a function to add the solutions to the array and emit the event
    function addSolution(address owner, uint256 index, bytes32 increment) public{

        solutions.push(Solutions(owner, index));
     
        emit AddedSolution(owner, index);
    }





// TODO Create a function to mint new NFT only after the solution has been verified
//  - make sure the solution is unique (has not been used before)
//  - make sure you handle metadata as well as tokenSuplly

    function mint( address to, uint256 tokenId, string memory tokenURI, uint[2] memory a, 
            uint[2] memory a_p, uint[2][2] memory b, uint[2] memory b_p, uint[2] memory c,
            uint[2] memory c_p, uint[2] memory h, uint[2] memory k, uint[2] memory input) public returns(bool) {

        bytes32 encoding = keccak256(abi.encodePacked(a, a_p, b, b_p, c, c_p, h, k, input));

             //  - make sure the solution is unique (has not been used before)
        require(uniqueSolutions[encoding].owner == address(0), "This solution has been used already. It should be unique");
 
        require(verifier .verifyTx(a, a_p, b, b_p, c, c_p, h, k, input), "Failed to verify the solution");
        addSolution(to, tokenId, encoding);

        super.mint(to, tokenId, tokenURI);
        
    }

  

}


 

























