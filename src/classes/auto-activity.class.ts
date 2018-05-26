import { Blockchain } from "./blockchain.class";
import { Transaction } from "./transaction.class";
export class AutoActivity {
  timeHanle: any;
  currentPayerAddr: string = "";
  currentPayeeAddr: string = "";
  currentCoinAmount: number = 0;

  constructor(public blockchain: Blockchain) {
    this.timeHanle = setInterval(() => {
      this.txnTrigger();
    }, 20000);
  }

  txnTrigger() {
    this.randomizePayer();
    this.randomizePayee();
    this.randomizeCoinAmount();
    this.sendTransaction();
  }

  getRandomAddress() {
    let addresses = this.blockchain.registeredAddresses;
    let len = addresses.length;
    return addresses[Math.floor(Math.random() * len)];
  }
  randomizePayer(): any {
    this.currentPayerAddr = this.getRandomAddress();
  }
  randomizePayee(): any {
    let payee = "";
    while (payee === "" || payee === this.currentPayerAddr) {
      payee = this.getRandomAddress();
    }
    this.currentPayeeAddr = payee;
  }
  randomizeCoinAmount(): any {
    this.currentCoinAmount = Math.floor(Math.random() * 100);
  }
  sendTransaction(): any {
    let txn = new Transaction(
      Date.now(),
      this.currentPayerAddr,
      this.currentPayeeAddr,
      this.currentCoinAmount
    );
    this.blockchain.receiveTransaction(txn);
    console.log(
      `Sending a random transaction with amount: ${this.currentCoinAmount}`
    );
  }
}
