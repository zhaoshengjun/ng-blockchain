import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppComponent } from "./app.component";
import { CryptoService } from "./services/crypto.service";

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule],
  providers: [CryptoService],
  bootstrap: [AppComponent]
})
export class AppModule {}
