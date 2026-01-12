import { expect } from "chai";
import hre from "hardhat";

describe("PaymentVault - Security & Multi-User Scenarios", function () {
  let vault;
  let owner, user1, user2;
  let ethers; 

  before(async () => {
    // 1. Connect to the network once for the whole test suite
    const connection = await hre.network.connect();
    ethers = connection.ethers;
  });

  beforeEach(async () => {
    [owner, user1, user2] = await ethers.getSigners();

    const Vault = await ethers.getContractFactory("PaymentVault");
    vault = await Vault.deploy();
    await vault.waitForDeployment();
  });

  it("should isolate balances between users", async () => {
    const amount1 = ethers.parseEther("1");
    const amount2 = ethers.parseEther("2");

    await (await vault.connect(user1).deposit({ value: amount1 })).wait();
    await (await vault.connect(user2).deposit({ value: amount2 })).wait();

    expect(await vault.balances(user1.address)).to.equal(amount1);
    expect(await vault.balances(user2.address)).to.equal(amount2);
  });

  it("should not allow one user to withdraw another user's funds", async () => {
    const amount = ethers.parseEther("1");

    await (await vault.connect(user1).deposit({ value: amount })).wait();

    await expect(
      vault.connect(user2).withdraw(amount)
    ).to.be.revertedWith("Insufficient balance");
  });

  it("pause should block withdrawals for all users", async () => {
    const amount = ethers.parseEther("1");

    await (await vault.connect(user1).deposit({ value: amount })).wait();
    await (await vault.pause()).wait();

    await expect(
      vault.connect(user1).withdraw(amount)
    ).to.be.revertedWith("Withdrawals paused");
  });

  it("owner should still not be able to withdraw user funds", async () => {
    const amount = ethers.parseEther("1");

    await (await vault.connect(user1).deposit({ value: amount })).wait();

    await expect(
      vault.connect(owner).withdraw(amount)
    ).to.be.revertedWith("Insufficient balance");
  });
});
