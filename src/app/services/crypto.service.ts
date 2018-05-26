import { AutoActivity } from "./../../classes/auto-activity.class";
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
  autoActivity: AutoActivity;

  constructor() {
    this.autoActivity = new AutoActivity(this.cryptoChain);
  }
}
