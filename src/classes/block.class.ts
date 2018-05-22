import * as SHA256 from "crypto-js/sha256";

export class Block {
  hash: string = null;

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
        JSON.stringify(this.data)
    ).toString();
  }
}
