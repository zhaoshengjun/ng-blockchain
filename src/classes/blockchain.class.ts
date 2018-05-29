import * as SHA256 from "crypto-js/sha256";

import { Block } from "./block.class";
import { Transaction } from "./transaction.class";
import { BlockScrollStrategy } from "@angular/cdk/overlay";

export class Blockchain {
  chain: Block[] = [];
  difficulty: number = 3;
  miningReward: number = 50;
  registeredAddresses: string[] = [];

  constructor() {
    this.createGenesisBlock();
    this.registeredAddresses = [
      "Wallet-Alice",
      "Wallet-Bob",
      "Wallet-Charlie",
      "Wallet-Miner49r"
    ];
    this.airdropCoins(100);
  }

  airdropCoins(coins: number) {
    let trxns: Transaction[] = [];
    for (const addr of this.registeredAddresses) {
      let txn = new Transaction(Date.now(), "mint", addr, coins);
      trxns.push(txn);
    }

    this.mineCurrentBlock("Wallet-Miner49r", trxns);
  }

  createGenesisBlock() {
    let txn = new Transaction(Date.now(), "mint", "genesis", 0);
    let block = new Block(Date.now(), [txn], "0");
    this.chain.push(block);
  }

  getLatestBlock() {
    return this.chain[this.chain.length - 1];
  }

  mineCurrentBlock(
    minerAddr: string,
    transactions: Transaction[]
  ): Promise<any> {
    // validate transactions first
    let validatedTxns: Transaction[] = [];

    for (const txn of transactions) {
      if (txn.payerAddr === "mint" || this.validateTransaction(txn)) {
        validatedTxns.push(txn);
      }
    }
    console.log(`Validated transactions: ${validatedTxns.length}`);
    transactions.push(
      new Transaction(Date.now(), "mint", minerAddr, this.miningReward)
    );
    let promise = new Promise((resolve, reject) => {
      let block = new Block(
        Date.now(),
        validatedTxns,
        this.getLatestBlock().hash
      );
      block.mineBlock(this.difficulty).then(() => {
        console.log("Current block successfully minded.");
        this.chain.push(block);
        resolve();
      });
    });

    return promise;
  }

  validateTransaction(txn) {
    let { payerAddr } = txn;
    let balance = this.getAddressBlance(payerAddr);
    if (balance >= txn.amount) {
      return true;
    } else {
      return false;
    }
  }

  getAddressBlance(addr: string) {
    let balance = 0;
    for (const block of this.chain) {
      for (const txn of block.txns) {
        if (txn.payerAddr === addr) {
          balance -= txn.amount;
        }
        if (txn.payeeAddr === addr) {
          balance += txn.amount;
        }
      }
    }
    return balance;
  }

  isChainValid() {
    for (let i = 1; i < this.chain.length; i++) {
      const currentBlock = this.chain[i];
      const previousBlock = this.chain[i - 1];
      // make sure the current block has not been modified
      if (currentBlock.hash !== currentBlock.calculateHash()) {
        return false;
      }
      // make sure previous block hasn't been modified.
      if (currentBlock.previousHash !== previousBlock.hash) {
        return false;
      }
    }

    return true;
  }

  receiveTransaction(txn: Transaction) {
    console.log(`Txn received with amount: ${txn.amount} `);
    this.mineCurrentBlock("Wallet-Miner49r", [txn]);
  }

  // Smart Contracts
  processCDSmartContract(txn: Transaction) {
    let now = new Date();
    let maturityDate: number = txn.smartContract.maturityDate.getTime();
    if (now.getTime() >= maturityDate) {
      let payoutTxn = new Transaction(
        Date.now(),
        txn.smartContract.contractAddress,
        txn.smartContract.payeeAddress,
        txn.smartContract.contractAmount
      );
      this.receiveTransaction(payoutTxn);
      console.log(`Smart contract: CD matured, payed out: ${payoutTxn.amount}`);
    }
  }

  iterateSmartContracts() {
    for (const block of this.chain) {
      for (const txn of block.txns) {
        if (txn.smartContract !== null && this.hasOpenContract(txn)) {
          this.processCDSmartContract(txn);
        }
      }
    }
  }

  hasOpenContract(txnToCheck: Transaction): boolean {
    for (const block of this.chain) {
      for (const txn of block.txns) {
        if (txn.payerAddr === txnToCheck.smartContract.contractAddress) {
          return false;
        }
      }
    }
    return true;
  }
}
