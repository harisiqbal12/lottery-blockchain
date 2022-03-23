const { expect } = require("chai");
const { ethers } = require("hardhat");

let lottery;
let owner;
let acc1;
let acc2;
let acc3;



describe("Lottery", function () {
  it("Deployed", async function () {
    const Lottery = await ethers.getContractFactory("Lottery");
    lottery = await Lottery.deploy();
    await lottery.deployed();

    console.log('Lottery deployed to: ' , lottery.address)
  });

  it('Get Manager', async () => {
    const manager = await lottery.manager();
    console.log('Manager: ', manager)
  });

  it('Get Hardhat Addresses', async() => {
    [owner, acc1, acc2, acc3] = await ethers.getSigners();
  })

  it('Enter A Lottery With Address1', async () => {
    console.log('Entering A Lottery With: ', acc1.address)
    await lottery.connect(acc1).enter({
      value: ethers.utils.parseEther("1.0")
    })
  });

  it('Enter A Lottery With Address2', async () => {
    console.log('Entering A Lottery With: ', acc1.address)
    await lottery.connect(acc2).enter({
      value: ethers.utils.parseEther("2.0")
    })
  });


  it('Enter A Lottery With Address3', async () => {
    console.log('Entering A Lottery With: ', acc1.address)
    await lottery.connect(acc3).enter({
      value: ethers.utils.parseEther("2.0")
    })
  });

  it('Total Players Enter A Lottery', async() => {
    const players = await lottery.getPlayers();
    console.log('Players');
    console.log(players)
  });

  it('Picking A Winner', async() => {
    await lottery.pickWinner();
  });

    it('Total Players After Picking A Winner', async() => {
    const players = await lottery.getPlayers();
    console.log('Players');
    console.log(players)
  });


});
