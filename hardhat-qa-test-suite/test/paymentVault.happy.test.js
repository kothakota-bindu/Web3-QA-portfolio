import { expect } from "chai";
import hre from "hardhat";

describe("PaymentVault - Happy Path", function () {
  let vault;
  let owner, user1;
  let ethers; // Declare ethers at the top level

  before(async () => {
    // 1. Connect to the network once for the whole test suite
    const connection = await hre.network.connect();
    ethers = connection.ethers;
  });

  beforeEach(async () => {
    // 2. Get signers and deploy
    [owner, user1] = await ethers.getSigners();

    const Vault = await ethers.getContractFactory("PaymentVault");
    vault = await Vault.deploy();
    await vault.waitForDeployment();
  });

  it("should allow user to deposit ETH and update balance", async () => {
    const depositAmount = ethers.parseEther("1");

    const tx = await vault.connect(user1).deposit({
      value: depositAmount,
    });
    await tx.wait();

    const balance = await vault.balances(user1.address);
    expect(balance).to.equal(depositAmount);
  });

  it("should emit Deposited event on deposit", async () => {
    const depositAmount = ethers.parseEther("0.5");

    await expect(
      vault.connect(user1).deposit({ value: depositAmount })
    )
      .to.emit(vault, "Deposited")
      .withArgs(user1.address, depositAmount);
  });

  it("should allow user to withdraw ETH and update balance", async () => {
    const depositAmount = ethers.parseEther("1");
    const withdrawAmount = ethers.parseEther("0.4");

    await (await vault.connect(user1).deposit({ value: depositAmount })).wait();
    await (await vault.connect(user1).withdraw(withdrawAmount)).wait();

    const remainingBalance = await vault.balances(user1.address);
    // Note: BigInt subtraction is used for ethers v6/Hardhat 3
    expect(remainingBalance).to.equal(depositAmount - withdrawAmount);
  });

  it("should reduce contract ETH balance after withdrawal", async () => {
    const depositAmount = ethers.parseEther("1");
    await (await vault.connect(user1).deposit({ value: depositAmount })).wait();

    const contractBalanceBefore = await ethers.provider.getBalance(vault.target);
    await (await vault.connect(user1).withdraw(depositAmount)).wait();

    const contractBalanceAfter = await ethers.provider.getBalance(vault.target);
    expect(contractBalanceAfter).to.equal(contractBalanceBefore - depositAmount);
  });
});
