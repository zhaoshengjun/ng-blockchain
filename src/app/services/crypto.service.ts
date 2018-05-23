import { Injectable } from "@angular/core";
import { Block } from "../../classes/block.class";
import { Blockchain } from "../../classes/blockchain.class";

@Injectable({
  providedIn: "root"
})
export class CryptoService {
  cyptoChain = new Blockchain();

  constructor() {
    console.log("startig to mine a new block");
    this.cyptoChain.addBlock(new Block(1, "22/05/2018", { amount: 10 }, ""));

    console.log("startig to mine a new block");
    this.cyptoChain.addBlock(new Block(2, "23/05/2018", { amount: 25 }, ""));
  }
}
