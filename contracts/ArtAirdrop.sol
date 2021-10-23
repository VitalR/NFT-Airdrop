// SPDX-License-Identifier: MIT
pragma solidity ^0.8.3;
pragma experimental ABIEncoderV2; // use dynamic arrays of strings

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

import "hardhat/console.sol";

contract ArtAirdrop is ERC721URIStorage {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    
    address payable public owner;
    uint256 public immutable maxSupply = 10000;
    uint256 public listingPrice = 0.08 ether; // 80000000000000000 wei;
    
    mapping (string => bool) private _urlReserved;
    
    event Minted(uint256 indexed newItemId, address tokenMinter);
    event SaleMint(address indexed tokenMinter, uint256 numberOfTokens);
    event TokenURIChanged(uint256 tokenId, string newTokenURI);
    event TokenPriceChanged(uint256 newTokenPrice);

    modifier onlyOwner() {
        require(owner == _msgSender(), "ART: caller is not the owner");
        _;
    }

    constructor(address payable _owner) ERC721("ART", "ART") {
        owner = _owner;
    }

    function mintART(
        address recipient,
        string[] memory tokenURI,
        uint numberOfTokens
    ) public payable returns (uint256[] memory) {
        uint256 maxARTPurchase = 20;
        uint256 totalPrice = listingPrice * numberOfTokens; 
        uint256 originalUserBalance = balanceOf(recipient);

        require(recipient != address(0), "ART: zero address");
        require(numberOfTokens > 0, "ART: invalid number of tokens");
        require(tokenURI.length == numberOfTokens,"ART: not appropriate number of tokens and tokenURIs");
        require(msg.value == totalPrice, "ART: incorrect Ether value");

        require(
            _tokenIds.current() + numberOfTokens <= maxSupply,
            "ART: max supply exceeded"
        );

        require(
            balanceOf(recipient) + numberOfTokens <= maxARTPurchase,
            "ART: max purchase per user exceeded"
        );

        uint[] memory itemIds = new uint[](numberOfTokens);

        for (uint256 i = 0; i < numberOfTokens; i++) {
            _tokenIds.increment();

            uint256 newItemId = _tokenIds.current();
            _mint(recipient, newItemId);
            _setTokenURI(newItemId, tokenURI[i]);
            itemIds[i] = newItemId;
            
            require(isURLReserved(tokenURI[i]) == false, "ART: URL already reserved");
            _urlReserved[tokenURI[i]] = true;
            
            emit Minted(newItemId, msg.sender);
        }
        
        assert(balanceOf(recipient) == originalUserBalance + numberOfTokens);
        
        payable(owner).transfer(msg.value);

        emit SaleMint(msg.sender, numberOfTokens);

        return itemIds;
    }

    function reserveART(address recipient, string[] memory tokenURI, uint numberOfTokens)
        public
        onlyOwner
        returns (uint256[] memory) 
    {
        uint256 maxARTReserve = 100; 
        uint256 originalUserBalance = balanceOf(recipient);

        require(recipient != address(0), "ART: zero address");
        require(numberOfTokens > 0, "ART: invalid number of tokens");
        require(tokenURI.length == numberOfTokens,"ART: not appropriate number of tokens and tokenURIs");

        require(
            _tokenIds.current() + numberOfTokens <= maxSupply,
            "ART: max supply exceeded"
        );

        require(
            balanceOf(recipient) + numberOfTokens <= maxARTReserve,
            "ART: max reserve count exceeded"
        );

        uint[] memory itemIds = new uint[](numberOfTokens);

        for (uint256 i = 0; i < numberOfTokens; i++) {
            _tokenIds.increment();

            uint256 newItemId = _tokenIds.current();
            _mint(recipient, newItemId);
            _setTokenURI(newItemId, tokenURI[i]);
            itemIds[i] = newItemId;
            
            require(isURLReserved(tokenURI[i]) == false, "ART: URL already reserved");
            _urlReserved[tokenURI[i]] = true;
            
            emit Minted(newItemId, msg.sender);
        }
        
        assert(balanceOf(recipient) == originalUserBalance + numberOfTokens);

        emit SaleMint(msg.sender, numberOfTokens);
        
        return itemIds;
    }

    function isURLReserved(string memory urlString) public view returns (bool) {
        return _urlReserved[urlString];
    }
    
    function setTokenURI(uint256 tokenId, string memory _newTokenURI) public onlyOwner {
        bytes memory notEmptyTokenURI = bytes(_newTokenURI);
        require(notEmptyTokenURI.length != 0, "ART: tokenURI is empty");
        require(isURLReserved(_newTokenURI) == false, "ART: URL already reserved or tries to set URI of nonexistent token");

        _setTokenURI(tokenId, _newTokenURI);
        _urlReserved[_newTokenURI] = true;
        emit TokenURIChanged(tokenId, _newTokenURI);
    }
}