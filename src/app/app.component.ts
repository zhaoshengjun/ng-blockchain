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
  blockchain = "";
  isChainValid: boolean = true;
  balance: number = 0;

  constructor(private cryptoSvc: CryptoService, private fb: FormBuilder) {
    this.walletAddressForm = this.fb.group({
      walletAddress: ["", Validators.required]
    });
    this.blockchain = JSON.stringify(this.cryptoSvc.cryptoChain);
    this.isChainValid = this.cryptoSvc.cryptoChain.isChainValid();
  }
}
