import { Transaction } from "./../../classes/transaction.class";
import { Injectable } from "@angular/core";
import { Block } from "../../classes/block.class";
import { Blockchain } from "../../classes/blockchain.class";

@Injectable({
  providedIn: "root"
})
export class CryptoService {
  cryptoChain = new Blockchain();
  unminedTxns: Transaction[] = [];

  constructor() {
    this.unminedTxns.push(
      new Transaction(Date.now(), "Wallet-Alice", "Wallet-Bob", 50)
    );
    this.unminedTxns.push(
      new Transaction(Date.now, "Wallet-Bob", "Wallet-Alice", 25)
    );
    console.log("Mining a block");
    this.cryptoChain
      .mineCurrentBlock("Wallet-Miner49r", this.unminedTxns)
      .then(() => {
        console.log(
          `Balance: Alice: ${this.cryptoChain.getAddressBlance("Wallet-Alice")}`
        );
        console.log(
          `Balance: Bob: ${this.cryptoChain.getAddressBlance("Wallet-Bob")}`
        );
        console.log(
          `Balance: Miner49r: ${this.cryptoChain.getAddressBlance(
            "Wallet-Miner49r"
          )}`
        );
      });
  }
}
