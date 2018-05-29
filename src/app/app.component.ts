import { CD } from "./../classes/cd.class";
import { Blockchain } from "./../classes/blockchain.class";
import { Wallet } from "./../classes/wallet.class";
import { CryptoService } from "./services/crypto.service";
import { Component } from "@angular/core";
import { FormGroup, Validators, FormBuilder } from "@angular/forms";
import { Transaction } from "../classes/transaction.class";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  walletAddressForm: FormGroup;
  sendCoinsForm: FormGroup;
  cdForm: FormGroup;
  blockchain: Blockchain;
  isChainValid: boolean = true;
  balance: number = 0;
  wallet: Wallet;

  constructor(private cryptoSvc: CryptoService, private fb: FormBuilder) {
    this.walletAddressForm = this.fb.group({
      walletAddress: ["", Validators.required]
    });
    this.sendCoinsForm = this.fb.group({
      receiverAddress: ["", Validators.required],
      transactionAmount: ["", Validators.required]
    });
    this.cdForm = this.fb.group({
      payeeAddress: ["", Validators.required],
      contractAmount: ["", Validators.required],
      maturityDate: ["", Validators.required]
    });
    this.blockchain = this.cryptoSvc.cryptoChain;
    this.isChainValid = this.cryptoSvc.cryptoChain.isChainValid();
    this.wallet = new Wallet();
  }
  assignWalletAddress() {
    this.wallet.assignWalletAddress(this.walletAddressForm.value.walletAddress);
  }

  getCurrentBalance() {
    console.log(`${this.wallet.address}`);
    this.balance = this.blockchain.getAddressBlance(this.wallet.address);
    console.log(`get current balance: ${this.balance}`);
  }
  sendTransaction() {
    let txn: Transaction = new Transaction(
      Date.now(),
      this.wallet.address,
      this.sendCoinsForm.value.receiverAddress,
      this.sendCoinsForm.value.transactionAmount
    );
    this.blockchain.receiveTransaction(txn, true);
  }

  createCDSmartContract() {
    let cd = new CD(
      this.generateSmartContractAddress(),
      this.cdForm.value.contractAmount,
      this.wallet.address,
      this.cdForm.value.payeeAddress,
      this.cdForm.value.maturityDate
    );

    console.log(`New CD smart contract: ${JSON.stringify(cd)}`);
    let txn = new Transaction(
      Date.now(),
      this.wallet.address,
      cd.contractAddress,
      cd.contractAmount
    );
    txn.smartContract = cd;
    this.blockchain.receiveTransaction(txn, false);
  }

  generateSmartContractAddress(): string {
    return `smartContract${(Math.random() * Date.now()).toString()}`;
  }
}
