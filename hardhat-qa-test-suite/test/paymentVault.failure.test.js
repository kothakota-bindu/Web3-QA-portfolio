import { expect } from "chai";
import hre from "hardhat";

describe("PaymentVault - Failure Scenarios", function () {
  let vault;
  let owner, user1;
  let ethers; 

  before(async () => {
    // 1. Connect to the network once for the whole test suite
    const connection = await hre.network.connect();
    ethers = connection.ethers;
  });

  beforeEach(async () => {
    [owner, user1] = await ethers.getSigners();

    const Vault = await ethers.getContractFactory("PaymentVault");
    vault = await Vault.deploy();
    await vault.waitForDeployment();
  });

  it("should revert when depositing 0 ETH", async () => {
    await expect(
      vault.connect(user1).deposit({ value: 0 })
    ).to.be.revertedWith("Zero deposit");
  });

  it("should revert when withdrawing 0 ETH", async () => {
    await expect(
      vault.connect(user1).withdraw(0)
    ).to.be.revertedWith("Zero withdraw");
  });

  it("should revert when withdrawing more than balance", async () => {
    await expect(
      vault.connect(user1).withdraw(ethers.parseEther("1"))
    ).to.be.revertedWith("Insufficient balance");
  });

  it("should revert withdrawal when contract is paused", async () => {
    const amount = ethers.parseEther("1");

    await (await vault.connect(user1).deposit({ value: amount })).wait();
    await (await vault.pause()).wait();

    await expect(
      vault.connect(user1).withdraw(amount)
    ).to.be.revertedWith("Withdrawals paused");
  });

  it("should revert when non-owner tries to pause", async () => {
    await expect(
      vault.connect(user1).pause()
    ).to.be.revertedWith("Not owner");
  });
});
