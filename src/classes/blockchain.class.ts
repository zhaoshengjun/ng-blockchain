import * as SHA256 from "crypto-js/sha256";

import { Block } from "./block.class";

export class Blockchain {
  chain: Block[];
  difficulty: number = 3;

  constructor() {
    this.chain = [this.createGenesisBlock()];
  }

  createGenesisBlock() {
    return new Block(0, "22/05/2018", "Genesis Block", "0");
  }

  getLatestBlock() {
    return this.chain[this.chain.length - 1];
  }

  addBlock(newBlock: Block) {
    newBlock.previousHash = this.getLatestBlock().hash;
    newBlock.mineBlock(this.difficulty);
    this.chain.push(newBlock);
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
