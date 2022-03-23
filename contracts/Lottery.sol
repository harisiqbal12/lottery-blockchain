// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

contract Lottery {
    address public manager;
    address payable[] private players;

    constructor() {
        manager = msg.sender;
    }

    function enter() public payable {
        require(msg.value > .01 ether);

        players.push(payable(msg.sender));
    }

    function random() private view returns(uint) {
       return uint(keccak256( abi.encodePacked(block.difficulty, block.timestamp, players)));
    }

    function pickWinner() public restricted {
        uint randomNumber = random();
        uint winner = randomNumber % players.length;
        
        players[winner].transfer(address(this).balance);
        players = new address payable[](0);
    }

    modifier restricted() {
        require(manager == msg.sender);
        _;
    }

    function getPlayers() public view returns(address payable[] memory) {
        return players;
    }

}
