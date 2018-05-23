import * as SHA256 from "crypto-js/sha256";

export class Block {
  hash: string = null;
  nonce: number = 0;

  constructor(
    public index: number,
    public timestamp: any,
    public data: any,
    public previousHash: string = null
  ) {
    this.hash = this.calculateHash();
  }

  calculateHash() {
    return SHA256(
      this.index +
        this.previousHash +
        this.timestamp +
        JSON.stringify(this.data) +
        this.nonce
    ).toString();
  }

  mineBlock(difficulty: number): Promise<any> {
    let promise = new Promise((resolve, reject) => {
      while (
        this.hash.substring(0, difficulty) != Array(difficulty + 1).join(0)
      ) {
        this.nonce++;
        this.hash = this.calculateHash();
      }
      console.log(
        `Block successfully hashed ( ${this.nonce} iterations). Hash: ${
          this.hash
        }) `
      );
      resolve();
    });

    return promise;
  }
}
