import * as SHA256 from "crypto-js/sha256";

import { Block } from "./block.class";
import { Transaction } from "./transaction.class";

export class Blockchain {
  chain: Block[] = [];
  difficulty: number = 3;
  miningReward: number = 50;

  constructor() {
    this.createGenesisBlock();
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
    transactions.push(
      new Transaction(Date.now(), "mint", minerAddr, this.miningReward)
    );
    let promise = new Promise((resolve, reject) => {
      let block = new Block(
        Date.now(),
        transactions,
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
}
