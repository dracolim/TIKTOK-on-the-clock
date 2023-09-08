// SPDX-License-Identifier: MIT
import "./StringUtils.sol";
import "./TTWallet.sol";
pragma solidity ^0.8.19;

// buyers pay to TTWalletManager
contract TTWalletManager {
    address owner;
    TTWallet[] private sellers;
    mapping(address => uint) balances;
    // username to wallet address
    mapping(string => address) userToWallet;

    constructor() {
        owner = msg.sender;
    }

    event SellerRegistered(string tiktokId, address sellerAddress);
    event BuyerDeposited(string sellerTiktokId, string buyerTiktokId);

    function newSeller(string memory tiktokId) private returns (address) {
        TTWallet seller = new TTWallet(tiktokId);
        address sellerAddress = address(seller);
        sellers.push(seller);
        return sellerAddress;
    }

    function register(string memory tiktokId) external {
        require(msg.sender == owner);
        address sellerAddress = newSeller(tiktokId);
        userToWallet[tiktokId] = sellerAddress;
        emit SellerRegistered(tiktokId, sellerAddress);
    }

    function buyerDeposit(
        string memory sellerTiktokId,
        string memory buyerTiktokId
    ) external payable {
        userToWallet[buyerTiktokId] = msg.sender;
        payable(userToWallet[sellerTiktokId]).transfer(msg.value);
        emit BuyerDeposited(sellerTiktokId, buyerTiktokId);
    }

    function getBalance() external view returns (uint) {
        return address(this).balance;
    }

    function getSellerBalance(
        string memory sellerTiktokId
    ) external view returns (uint) {
        return userToWallet[sellerTiktokId].balance;
    }
}
