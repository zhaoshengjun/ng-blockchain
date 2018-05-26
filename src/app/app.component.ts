import { Blockchain } from "./../classes/blockchain.class";
import { Wallet } from "./../classes/wallet.class";
import { CryptoService } from "./services/crypto.service";
import { Component } from "@angular/core";
import { FormGroup, Validators, FormBuilder } from "@angular/forms";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  walletAddressForm: FormGroup;
  blockchain: Blockchain;
  isChainValid: boolean = true;
  balance: number = 0;
  wallet: Wallet;

  constructor(private cryptoSvc: CryptoService, private fb: FormBuilder) {
    this.walletAddressForm = this.fb.group({
      walletAddress: ["", Validators.required]
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
}
